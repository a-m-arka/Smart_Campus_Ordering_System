import { pool } from "../config/db.js";
import { foodQueries } from "../queries/foodQueries.js";


export const validateFoodInfo = (
    { title, description, price, category, isAvailable },
    mode = 'add'
) => {

    if (mode === 'add') {
        if (!title || !description || !price || !category || isAvailable === undefined) {
            return { valid: false, statusCode: 400, message: 'All fields are required' };
        }
    }

    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
            return { valid: false, statusCode: 400, message: 'Title must not be empty' };
        }
    }

    if (description !== undefined) {
        if (typeof description !== 'string' || description.trim() === '') {
            return { valid: false, statusCode: 400, message: 'Description must not be empty' };
        }
    }

    if (price !== undefined) {
        if (isNaN(price) || Number(price) <= 0) {
            return { valid: false, statusCode: 400, message: 'Price must be a positive number' };
        }
    }

    if (category !== undefined) {
        if (typeof category !== 'string' || category.trim() === '') {
            return { valid: false, statusCode: 400, message: 'Category must not be empty' };
        }
    }

    if (isAvailable !== undefined) {
        if (typeof isAvailable !== "string" || !["true", "false"].includes(isAvailable)) {
            return { valid: false, statusCode: 400, message: 'isAvailable must be "true" or "false"' };
        }
    }

    return { valid: true };
};

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

export const updateFoodItem = async (foodId, updateData, newImageUrl = null, newImagePublicId = null) => {
    const query = foodQueries.updateFoodItem;

    const values = [
        updateData.title ?? null,
        updateData.description ?? null,
        updateData.price ?? null,
        newImageUrl ?? null,
        newImagePublicId ?? null,
        updateData.isAvailable ?? null,
        updateData.category ?? null,
        foodId
    ];

    await pool.query(query, values);
};

export const getAllFoodItems = async () => {
    const query = foodQueries.getAllFoodItems;
    const [rows] = await pool.query(query);
    return rows;
};

export const getFoodItemById = async (foodId) => {
    const query = foodQueries.getFoodItemById;
    const [rows] = await pool.query(query, [foodId]);
    return rows[0];
};

export const getVendorMenu = async (vendorId) => {
    const query = foodQueries.getVendorMenu;
    const [rows] = await pool.query(query, [vendorId]);
    return rows;
};