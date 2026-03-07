import { verifyToken, validateDecodedToken } from "../utils/authUtils.js";
import FoodModel from "../models/foodModel.js";
import * as foodService from '../services/foodService.js';

export const addFood = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    const { title, description, price, category, isAvailable } = req.body;
    if (!title || !description || !price || !category || isAvailable === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Title must not be empty' });
    }
    if (typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ message: 'Description must not be empty' });
    }
    if (isNaN(price) || Number(price) <= 0) {
        return res.status(400).json({ message: 'Price must be a positive number' });
    }
    if (typeof category !== 'string' || category.trim() === '') {
        return res.status(400).json({ message: 'Category must not be empty' });
    }
    if (typeof isAvailable !== "string" || !["true", "false"].includes(isAvailable)) {
        return res.status(400).json({ message: 'isAvailable must be "true" or "false"' });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const decodedToken = verifyToken(token);
        const validation = validateDecodedToken(decodedToken, 'vendor');
        if (!validation.valid) {
            return res.status(validation.statusCode).json({ message: validation.message });
        }
        const foodItem = new FoodModel({ title, description, price, category, isAvailable: isAvailable === "true" });
        const fileBuffer = req.file.buffer;
        const timestamp = Date.now();
        const originalName = req.file.originalname.replace(/\s+/g, '_');
        const fileName = `foods/${timestamp}-${originalName}`;

        const response = await foodService.addFood(decodedToken.id, foodItem, fileBuffer, fileName);
        if (response.success) {
            console.log(`New food item added successfully`);
            return res.status(201).json({ message: response.message });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error('Error adding food item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};