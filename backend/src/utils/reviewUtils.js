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