import * as orderUtils from '../utils/orderUtils.js';
import OrderModel from '../models/orderModel.js';

export const createOrder = async (studentId, orderData) => {
    try {
        const { vendorId, paymentMethod, deliveryAddress, items } = orderData;
        const totalAmount = orderUtils.calculateTotalAmount(items);

        const order = new OrderModel({
            studentId,
            vendorId,
            totalAmount,
            deliveryAddress,
            paymentMethod
        });

        const { success, orderId, error } = await orderUtils.createOrder(order);
        if (!success) return { success: false, message: "Failed to place order", error };

        for (const item of items) {
            const itemResult = await orderUtils.addOrderItem({
                orderId,
                foodItemId: item.id,
                quantity: item.quantity,
                price: item.price
            });

            if (!itemResult.success) {
                await orderUtils.deleteOrder(orderId);
                return { success: false, message: "Failed to add an item to order, order rolled back", error: itemResult.error };
            }
        }

        return { success: true, message: "Order created successfully", orderId };
    } catch (error) {
        console.error("Error in createOrder service:", error.stack);
        return { success: false, message: "Failed to place order", error };
    }
};