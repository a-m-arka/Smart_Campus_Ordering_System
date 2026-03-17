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
        console.error("Error in createReviewService:", error.stack);
        return { success: false, message: "Failed to post review" };
    } finally {
        conn.release();
    }
};