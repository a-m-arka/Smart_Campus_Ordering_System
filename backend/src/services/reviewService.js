import { pool } from "../config/db.js";
import * as reviewUtils from "../utils/reviewUtils.js";
import { updateFoodRating } from "../utils/foodUtils.js";
import { updateVendorRating } from "../utils/userUtils.js";

export const createReview = async (studentId, reviewData) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const { vendorId, itemId, rating, feedback } = reviewData;

        const createResult = await reviewUtils.createReview(conn, {
            studentId,
            vendorId,
            itemId,
            rating,
            feedback
        });

        if (!createResult.success) throw new Error("Failed to create review");

        await updateFoodRating(conn, itemId);
        await updateVendorRating(conn, vendorId);

        await conn.commit();
        return { success: true, message: "Review posted successfully" };

    } catch (error) {
        await conn.rollback();
        console.error("Error in createReview Service:", error.stack);
        return { success: false, message: "Failed to post review" };
    } finally {
        conn.release();
    }
};

export const updateReview = async (newReviewData) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const { reviewId, studentId, itemId, vendorId, newRating, newFeedback } = newReviewData;

        const updateResult = await reviewUtils.updateReview(
            conn,
            reviewId,
            studentId,
            newRating,
            newFeedback
        );
        if(!updateResult.success) throw new Error("Failed to update review");

        await updateFoodRating(conn, itemId);
        await updateVendorRating(conn, vendorId);

        await conn.commit();
        return { success: true, message: "Review updated successfully" };

    } catch (error) {
        await conn.rollback();
        console.error("Error in updateReview Service:", error.stack);
        return { success: false, message: "Failed to update review" };
    } finally {
        conn.release();
    }
};

export const getItemReviews = async (itemId) => {
    try {
        const reviewResult = await reviewUtils.getItemReviews(itemId);
        if (!reviewResult.success) throw new Error("Failed to fetch item reviews");
        return { success: true, reviews: reviewResult.itemReviews };
    } catch (error) {
        console.error("Error in getItemReviews sevice:", error.stack);
        return { success: false, message: "Failed to get item reviews" };
    }
};

export const getVendorReviews = async (vendorId) => {
    try {
        const reviewResult = await reviewUtils.getVendorReviews(vendorId);
        if (!reviewResult.success) throw new Error("Failed to fetch vendor reviews");
        return { success: true, reviews: reviewResult.vendorReviews };
    } catch (error) {
        console.error("Error in getVendorReviews sevice:", error.stack);
        return { success: false, message: "Failed to get vendor reviews" };
    }
};

export const getStudentReviews = async (studentId) => {
    try {
        const reviewResult = await reviewUtils.getStudentReviews(studentId);
        if (!reviewResult.success) throw new Error("Failed to fetch student reviews");
        return { success: true, reviews: reviewResult.studentReviews };
    } catch (error) {
        console.error("Error in getStudentReviews sevice:", error.stack);
        return { success: false, message: "Failed to get student reviews" };
    }
};