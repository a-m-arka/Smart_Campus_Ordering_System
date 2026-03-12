import { pool } from "../config/db.js";
import { orderQueries, orderItemQueries } from "../queries/orderQueries.js";

const generateRandomId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

export const generateUniqueOrderId = async () => {
  let unique = false;
  let orderId = '';
  while (!unique) {
    orderId = generateRandomId();
    const [rows] = await pool.query(orderQueries.getOrderById, [orderId]);
    if (rows.length === 0) unique = true;
  }
  return orderId;
};

export const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const createOrder = async (order) => {
  try {
    const orderId = await generateUniqueOrderId();
    const { studentId, vendorId, totalAmount, paymentMethod, deliveryAddress } = order;

    await pool.query(orderQueries.createOrder, [
      orderId,
      studentId,
      vendorId,
      totalAmount,
      paymentMethod,
      deliveryAddress
    ]);

    return { success: true, orderId };
  } catch (error) {
    console.error("Error creating order:", error.stack);
    return { success: false, message: "Failed to create order", error };
  }
};

export const addOrderItem = async (item) => {
  try {
    const { orderId, foodItemId, quantity, price } = item;
    const [result] = await pool.query(orderItemQueries.addOrderItem, [
      orderId,
      foodItemId,
      quantity,
      price
    ]);
    return { success: true, itemId: result.insertId };
  } catch (error) {
    console.error("Error adding order item:", error.stack);
    return { success: false, message: "Failed to add order item", error };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    await pool.query(orderQueries.updateOrderStatus, [status, orderId]);
    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error.stack);
    return { success: false, message: "Failed to update order status", error };
  }
};

export const updatePaymentStatus = async (orderId, paymentStatus) => {
  try {
    await pool.query(orderQueries.updatePaymentStatus, [paymentStatus, orderId]);
    return { success: true };
  } catch (error) {
    console.error("Error updating payment status:", error.stack);
    return { success: false, message: "Failed to update payment status", error };
  }
};

export const getOrderById = async (orderId) => {
  try {
    const [rows] = await pool.query(orderQueries.getOrderById, [orderId]);
    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching order:", error.stack);
    return null;
  }
};

export const getOrdersByStudent = async (studentId) => {
  try {
    const [rows] = await pool.query(orderQueries.getOrdersByStudent, [studentId]);
    return rows;
  } catch (error) {
    console.error("Error fetching orders for student:", error.stack);
    return [];
  }
};

export const getOrdersByVendor = async (vendorId) => {
  try {
    const [rows] = await pool.query(orderQueries.getOrdersByVendor, [vendorId]);
    return rows;
  } catch (error) {
    console.error("Error fetching orders for vendor:", error.stack);
    return [];
  }
};

export const getOrderItemsByOrder = async (orderId) => {
  try {
    const [rows] = await pool.query(orderItemQueries.getOrderItemsByOrder, [orderId]);
    return rows;
  } catch (error) {
    console.error("Error fetching order items:", error.stack);
    return [];
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const [result] = await pool.query(orderQueries.deleteOrder, [orderId]);
    if (result.affectedRows === 0) {
      return { success: false, message: "Order not found" };
    }
    return { success: true, message: "Order deleted successfully" };
  } catch (error) {
    console.error("Error deleting order:", error.stack);
    return { success: false, message: "Failed to delete order", error };
  }
};

export const deleteOrderItemsByOrder = async (orderId) => {
  try {
    await pool.query(orderItemQueries.deleteOrderItemsByOrder, [orderId]);
    return { success: true };
  } catch (error) {
    console.error("Error deleting order items:", error.stack);
    return { success: false, message: "Failed to delete order items", error };
  }
};