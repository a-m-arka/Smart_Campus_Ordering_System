import * as orderService from '../services/orderService.js';
import { verifyToken, validateDecodedToken } from '../utils/authUtils.js';
import { findUserById } from '../utils/userUtils.js';
import { getFoodItemById } from '../utils/foodUtils.js';
import { getOrderById } from '../utils/orderUtils.js';

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

export const getUserOrders = async (req, res) => {
    try {
        const { userRole } = req.params;
        if (!userRole || (userRole !== "student" && userRole !== "vendor")) {
            return res.status(400).json({ message: 'Invalid user role.' });
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token not found' });
        const decodedToken = verifyToken(token);
        const tokenValidation = validateDecodedToken(decodedToken, userRole);
        if (!tokenValidation.valid) {
            return res.status(tokenValidation.statusCode).json({ message: tokenValidation.message });
        }

        const response = await orderService.getOrderByUser(decodedToken.id, userRole);
        if (response.success) {
            return res.status(200).json({ result: response.orders });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error("Error in getUserOrders controller:", error.stack);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    const validTransitions = {
        pending: { confirmed: "vendor", cancelled: "any" },
        confirmed: { preparing: "vendor" },
        preparing: { out_for_delivery: "vendor" },
        out_for_delivery: { delivered: "vendor" }
    };

    try {
        const { orderId } = req.params;
        if (!orderId) {
            return res.status(400).json({ message: 'Invalid order ID.' });
        }

        const { newStatus, userRole } = req.body;
        if (!newStatus) {
            return res.status(400).json({ message: 'Invalid new status.' });
        }
        if (!userRole || (userRole !== "student" && userRole !== "vendor")) {
            return res.status(400).json({ message: 'Invalid user role.' });
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token not found.' });
        const decodedToken = verifyToken(token);
        const tokenValidation = validateDecodedToken(decodedToken, userRole);
        if (!tokenValidation.valid) {
            return res.status(tokenValidation.statusCode).json({ message: tokenValidation.message });
        }

        const orderData = await getOrderById(orderId);
        if (!orderData) {
            return res.status(404).json({ message: "Order not found." });
        }
        if (userRole === "student" && decodedToken.id !== orderData.studentId) {
            return res.status(404).json({ message: "No such order found for this student." });
        }
        if (userRole === "vendor" && decodedToken.id !== orderData.vendorId) {
            return res.status(404).json({ message: "No such order found for this vendor." });
        }

        const currentStatus = orderData.status;
        const nextStatusRules = validTransitions[currentStatus];

        // Check if newStatus is valid for current status
        if (!nextStatusRules || !Object.keys(nextStatusRules).includes(newStatus)) {
            return res.status(400).json({
                message: `Invalid status transition from ${currentStatus} to ${newStatus}.`
            });
        }

        // Check if userRole is allowed to make this transition
        const allowedRole = nextStatusRules[newStatus];
        if (allowedRole !== "any" && allowedRole !== userRole) {
            return res.status(403).json({
                message: `Only ${allowedRole} can set order to ${newStatus}.`
            });
        }

        let newPaymentStatus = null;
        if(newStatus === "delivered" && orderData.paymentMethod === "cod") newPaymentStatus = "paid";
        else if(newStatus === "cancelled") newPaymentStatus = "failed";

        const response = await orderService.updateOrderStatus(orderId, newStatus, orderData.paymentStatus, newPaymentStatus);
        if (response.success) {
            return res.status(200).json({ message: "Order status updated successfully." });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};