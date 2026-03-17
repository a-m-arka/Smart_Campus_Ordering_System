import * as reviewService from '../services/reviewService.js';
import { verifyToken, validateDecodedToken } from '../utils/authUtils.js';
import { findUserById } from '../utils/userUtils.js';
import { getFoodItemById } from '../utils/foodUtils.js';

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
        return res.status(500).json({ message: 'Failed to post review' });
    }
};