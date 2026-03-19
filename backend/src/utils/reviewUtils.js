import { pool } from "../config/db.js";
import { reviewQueries } from "../queries/reviewQueries.js";

export const createReview = async (conn, reviewData) => {
    try {
        const { studentId, vendorId, itemId, rating, feedback } = reviewData;
        const [result] = await conn.query(reviewQueries.createReview, [
            studentId,
            vendorId,
            itemId,
            rating,
            feedback
        ]);
        return { success: true, reviewId: result.insertId };
    } catch (error) {
        console.error("Error creating review:", error.stack);
        return { success: false, message: "Failed to create review", error };
    }
};

export const updateReview = async (conn, reviewId, studentId, newRating, newFeedback) => {
    try {
        await conn.query(reviewQueries.updateReview, [
            newRating,
            newFeedback,
            reviewId,
            studentId
        ]);
        return { success: true };
    } catch (error) {
        console.error("Error updating review:", error.stack);
        return { success: false, message: "Failed to update review", error };
    }
};

export const getReviewById = async (reviewId) => {
    try {
        const [review] = await pool.query(reviewQueries.getReviewById, reviewId);
        return review.length > 0 ? review[0] : null;
    } catch (error) {
        console.error("Error details:", error.stack);
        return null;
    }
};

export const getItemReviews = async (itemId) => {
    try {
        const [result] = await pool.query(reviewQueries.getFoodItemReviews, itemId);
        return { success: true, itemReviews: result };
    } catch (error) {
        console.error("Error fetching item reviews:", error.stack);
        return { success: false, message: "Failed to fetch item reviews", error };
    }
};

export const getVendorReviews = async (vendorId) => {
    try {
        const [result] = await pool.query(reviewQueries.getVendorReviews, vendorId);
        return { success: true, vendorReviews: result };
    } catch (error) {
        console.error("Error fetching vendor reviews:", error.stack);
        return { success: false, message: "Failed to fetch vendor reviews", error };
    }
};

export const getStudentReviews = async (studentId) => {
    try {
        const [result] = await pool.query(reviewQueries.getStudentReviews, studentId);
        return { success: true, studentReviews: result };
    } catch (error) {
        console.error("Error fetching student reviews:", error.stack);
        return { success: false, message: "Failed to fetch student reviews", error };
    }
};