import * as reviewService from '../services/reviewService.js';
import { verifyToken, validateDecodedToken } from '../utils/authUtils.js';
import { findUserById } from '../utils/userUtils.js';
import { getFoodItemById } from '../utils/foodUtils.js';
import { getReviewById } from '../utils/reviewUtils.js';

export const createReview = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token not found' });

        const decodedToken = verifyToken(token);
        const tokenValidation = validateDecodedToken(decodedToken, 'student');
        if (!tokenValidation.valid) {
            return res.status(tokenValidation.statusCode).json({ message: tokenValidation.message });
        }

        const { vendorId, itemId, rating, feedback } = req.body;

        if (!vendorId || !Number.isInteger(Number(vendorId)) || Number(vendorId) <= 0) {
            return res.status(400).json({ message: 'Valid vendor ID is required' });
        }
        const vendor = await findUserById(vendorId, 'vendor');
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

        if (!itemId || !Number.isInteger(Number(itemId)) || Number(itemId) <= 0) {
            return res.status(400).json({ message: 'Valid item ID is required' });
        }
        const item = await getFoodItemById(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (!rating || !Number.isInteger(Number(rating)) || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Valid rating is required (1-5)' });
        }

        if (!feedback || typeof feedback !== 'string') {
            return res.status(400).json({ message: 'Feedback is required and must be a string' });
        }
        const trimmedFeedback = feedback.trim();
        if (trimmedFeedback.length === 0 || trimmedFeedback.length > 500) {
            return res.status(400).json({ message: 'Feedback must be 1-500 characters' });
        }

        const result = await reviewService.createReview(decodedToken.id, {
            vendorId,
            itemId,
            rating,
            feedback: trimmedFeedback
        });

        if (result.success) {
            return res.status(201).json({ message: 'Review posted successfully', reviewId: result.reviewId });
        } else {
            return res.status(500).json({ message: result.message });
        }
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: 'Failed to post review. Internal Server Error' });
    }
};

export const updateReview = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token not found' });

        const decodedToken = verifyToken(token);
        const tokenValidation = validateDecodedToken(decodedToken, 'student');
        if (!tokenValidation.valid) {
            return res.status(tokenValidation.statusCode).json({ message: tokenValidation.message });
        }

        const { reviewId } = req.params;
        const currentReview = await getReviewById(reviewId);
        if (!currentReview) {
            return req.status(404).json({ message: "Review not found" });
        }
        if (currentReview.studentId !== decodedToken.id) {
            return res.status(403).json({ message: "Unauthorized to access this review" });
        }

        const { newRating, newFeedback } = req.body;
        if (!newRating || !Number.isInteger(Number(newRating)) || newRating < 1 || newRating > 5) {
            return res.status(400).json({ message: 'Valid new rating is required (1-5)' });
        }
        if (!newFeedback || typeof newFeedback !== 'string') {
            return res.status(400).json({ message: 'New feedback is required and must be a string' });
        }
        const trimmedFeedback = newFeedback.trim();
        if (trimmedFeedback.length === 0 || trimmedFeedback.length > 500) {
            return res.status(400).json({ message: 'Feedback must be 1-500 characters' });
        }

        const newReviewData = {
            reviewId,
            studentId: decodedToken.id,
            itemId: currentReview.itemId,
            vendorId: currentReview.vendorId,
            newRating,
            newFeedback
        };

        const result = await reviewService.updateReview(newReviewData);
        if (result.success) {
            return res.status(200).json({ message: result.message });
        } else {
            return res.status(500).json({ message: result.message });
        }

    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: 'Failed to update review. Internal Server Error' });
    }
};

export const getItemReviews = async (req, res) => {
    try {
        const { itemId } = req.params;
        if (!itemId || !Number.isInteger(Number(itemId)) || Number(itemId) <= 0) {
            return res.status(400).json({ message: 'Valid item ID is required' });
        }
        const item = await getFoodItemById(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        const itemData = {
            name: item.name,
            vendor: item.vendorName,
            vendorLocation: item.vendorLocation,
            image: item.image_url,
            itemRating: item.average_rating,
            itemTotalReviews: item.review_count
        };

        const result = await reviewService.getItemReviews(itemId);
        if (result.success) {
            return res.status(200).json({
                message: 'Reviews fetched successfully',
                itemData,
                reviews: result.reviews
            });
        } else {
            return res.status(500).json({ message: result.message });
        }
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: 'Failed to fetch item reviews. Internal Server Error' });
    }
};

export const getVendorReviews = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token not found' });

        const decodedToken = verifyToken(token);
        const tokenValidation = validateDecodedToken(decodedToken, 'vendor');
        if (!tokenValidation.valid) {
            return res.status(tokenValidation.statusCode).json({ message: tokenValidation.message });
        }

        const vendor = await findUserById(decodedToken.id, 'vendor');
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const result = await reviewService.getVendorReviews(decodedToken.id);
        if (result.success) {
            return res.status(200).json({
                message: 'Reviews fetched successfully',
                reviews: result.reviews
            });
        } else {
            return res.status(500).json({ message: result.message });
        }
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: 'Failed to fetch vendor reviews. Internal Server Error' });
    }
};

export const getStudentReviews = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token not found' });

        const decodedToken = verifyToken(token);
        const tokenValidation = validateDecodedToken(decodedToken, 'student');
        if (!tokenValidation.valid) {
            return res.status(tokenValidation.statusCode).json({ message: tokenValidation.message });
        }

        const Student = await findUserById(decodedToken.id, 'student');
        if (!Student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const result = await reviewService.getStudentReviews(decodedToken.id);
        if (result.success) {
            return res.status(200).json({
                message: 'Reviews fetched successfully',
                reviews: result.reviews
            });
        } else {
            return res.status(500).json({ message: result.message });
        }
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: 'Failed to fetch student reviews. Internal Server Error' });
    }
};