import { verifyToken, validateDecodedToken } from "../utils/authUtils.js";
import FoodModel from "../models/foodModel.js";
import * as foodService from '../services/foodService.js';
import { validateFoodInfo } from "../utils/foodUtils.js";

export const addFood = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    const { title, description, price, category, isAvailable } = req.body;
    const validation = validateFoodInfo({ title, description, price, category, isAvailable }, 'add');
    if (!validation.valid) {
        return res.status(validation.statusCode).json({ message: validation.message });
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

export const editFood = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    const { foodId } = req.params;
    if (!foodId) {
        return res.status(400).json({ message: 'Food item ID is required' });
    }

    const { title, description, price, category, isAvailable } = req.body;

    const validation = validateFoodInfo(
        { title, description, price, category, isAvailable },
        'edit'
    );

    if (!validation.valid) {
        return res.status(validation.statusCode).json({ message: validation.message });
    }

    try {
        const decodedToken = verifyToken(token);
        const tokenValidation = validateDecodedToken(decodedToken, 'vendor');

        if (!tokenValidation.valid) {
            return res.status(tokenValidation.statusCode).json({ message: tokenValidation.message });
        }

        const updateData = {};

        if (title !== undefined) updateData.title = title.trim();
        if (description !== undefined) updateData.description = description.trim();
        if (price !== undefined) updateData.price = Number(price);
        if (category !== undefined) updateData.category = category.trim();
        if (isAvailable !== undefined) updateData.isAvailable = isAvailable === "true";

        let fileBuffer = null;
        let fileName = null;

        if (req.file) {
            fileBuffer = req.file.buffer;
            const timestamp = Date.now();
            const originalName = req.file.originalname.replace(/\s+/g, '_');
            fileName = `foods/${timestamp}-${originalName}`;
        }

        const response = await foodService.editFood(
            decodedToken.id,
            foodId,
            updateData,
            fileBuffer,
            fileName
        );

        if (response.success) {
            return res.status(200).json({ message: response.message });
        }

        return res.status(400).json({ message: response.message });

    } catch (error) {
        console.error('Error editing food item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};