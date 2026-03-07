import { pool } from "../config/db.js";
import { foodQueries } from "../queries/foodQueries.js";

export const addFoodItem = async (vendorId, foodItem, imageUrl, imagePublicId) => {
    const query = foodQueries.addFoodItem;
    const values = [
        vendorId,
        foodItem.title,
        foodItem.description,
        foodItem.price,
        imageUrl,
        imagePublicId,
        foodItem.isAvailable,
        foodItem.category,
        foodItem.averageRating || 0,
        foodItem.reviewCount || 0
    ];
    await pool.query(query, values);
};

export const getAllFoodItems = async () => {
    const query = foodQueries.getAllFoodItems;
    const [rows] = await pool.query(query);
    return rows;
};

export const getVendorMenu = async (vendorId) => {
    const query = foodQueries.getVendorMenu;
    const [rows] = await pool.query(query, [vendorId]);
    return rows;
};