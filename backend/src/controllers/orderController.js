import * as orderService from '../services/orderService.js';
import { verifyToken, validateDecodedToken } from '../utils/authUtils.js';
import { findUserById } from '../utils/userUtils.js';
import { getFoodItemById } from '../utils/foodUtils.js';

export const createOrder = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token not found' });

        const decodedToken = verifyToken(token);
        const tokenValidation = validateDecodedToken(decodedToken, 'student');
        if (!tokenValidation.valid) return res.status(tokenValidation.statusCode).json({ message: tokenValidation.message });

        const { vendorId, paymentMethod, deliveryAddress, items } = req.body;

        if (!vendorId || !Number.isInteger(Number(vendorId)) || Number(vendorId) <= 0) return res.status(400).json({ message: 'Valid vendor ID is required' });

        const vendor = await findUserById(vendorId, 'vendor');
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

        const validPaymentMethods = ['cod', 'mobile'];
        if (!paymentMethod || !validPaymentMethods.includes(paymentMethod)) return res.status(400).json({ message: 'Invalid payment method' });

        if (!deliveryAddress || typeof deliveryAddress !== 'string' || deliveryAddress.trim() === '') return res.status(400).json({ message: 'Invalid delivery address' });

        if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Items array cannot be empty' });

        for (const item of items) {
            if (
                !item.id ||
                !Number.isInteger(Number(item.id)) ||
                Number(item.id) <= 0 ||
                !item.price ||
                isNaN(Number(item.price)) ||
                Number(item.price) < 0 ||
                !item.quantity ||
                !Number.isInteger(Number(item.quantity)) ||
                Number(item.quantity) <= 0
            ) return res.status(400).json({ message: 'Each item must have valid id, price, and quantity' });

            const foodItem = await getFoodItemById(item.id);
            if (!foodItem) return res.status(404).json({ message: `Food item with id ${item.id} not found` });
        }

        const response = await orderService.createOrder(
            decodedToken.id,
            {
                vendorId,
                paymentMethod,
                deliveryAddress,
                items
            }
        );

        if (response.success) {
            return res.status(200).json({ message: response.message, orderId: response.orderId });
        }

        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};