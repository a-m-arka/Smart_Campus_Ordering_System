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

export const getOrderByUser = async (userId, userRole) => {
    try {
        const orders = await orderUtils.getOrdersByUser(userId, userRole);
        if (orders.success) {
            // console.log(orders);
            return { success: true, orders };
        }
        return { success: false, message: orders.message }
    } catch (error) {
        console.error("Error in getOrderByUser service:", error.stack);
        return { success: false, message: `Failed fetching ${userRole} orders`, error };
    }
};

export const updateOrderStatus = async (orderId, newStatus, currentPaymentStatus, newPaymentStatus) => {
    try {
        if(newPaymentStatus){
            const updatePaymentStatus = await orderUtils.updatePaymentStatus(orderId, newPaymentStatus);
            if(!updatePaymentStatus.success){
                return {success: false, message: updatePaymentStatus.message}
            }
        }
        const updateResult = await orderUtils.updateOrderStatus(orderId, newStatus);
        if(updateResult.success){
            return {success: true};
        }
        await orderUtils.updatePaymentStatus(orderId, currentPaymentStatus);
        return {success: false, message: updateResult.message};
    } catch (error) {
        console.error("Error in updateOrderStatus service:", error.stack);
        return {success: false, message: "Failed to update order status."};
    }
};