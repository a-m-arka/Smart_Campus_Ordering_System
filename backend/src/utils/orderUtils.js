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
    return { success: false, message: "Failed to create order" };
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
    return { success: false, message: "Failed to add order item" };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    await pool.query(orderQueries.updateOrderStatus, [status, orderId]);
    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error.stack);
    return { success: false, message: "Failed to update order status" };
  }
};

export const updatePaymentStatus = async (orderId, paymentStatus) => {
  try {
    await pool.query(orderQueries.updatePaymentStatus, [paymentStatus, orderId]);
    return { success: true };
  } catch (error) {
    console.error("Error updating payment status:", error.stack);
    return { success: false, message: "Failed to update payment status" };
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

export const getOrdersByUser = async (userId, role) => {
  try {
    let query;
    if (role === "student") {
      query = orderQueries.getOrdersByStudent;
    } else if (role === "vendor") {
      query = orderQueries.getOrdersByVendor;
    } else {
      throw new Error("Invalid role");
    }

    const [rows] = await pool.query(query, [userId]);

    const ordersMap = {};
    rows.forEach(row => {
      if (!ordersMap[row.orderId]) {
        ordersMap[row.orderId] = {
          orderId: row.orderId,
          deliveryAddress: row.deliveryAddress,
          totalAmount: row.totalAmount,
          status: row.status,
          paymentMethod: row.paymentMethod === "cod" ? "Cash On Delivery" : "Mobile Banking",
          paymentStatus: row.paymentStatus,
          orderTime: row.orderTime,
          student: {
            id: row.studentId,
            name: row.studentName,
            phone: row.studentPhone
          },
          vendor: {
            id: row.vendorId,
            name: row.vendorName,
            phone: row.vendorPhone,
            stallName: row.stallName,
            stallLocation: row.stallLocation
          },
          items: []
        };
      }
      ordersMap[row.orderId].items.push({
        foodItemId: row.foodItemId,
        name: row.itemName,
        price: row.price,
        quantity: row.quantity,
        imageUrl: row.imageUrl,
      });
    });

    const orders = Object.values(ordersMap);
    orders.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));

    // console.log(orders);

    return { success: true, orders };
  } catch (error) {
    console.error("Error fetching orders:", error.stack);
    return { success: false, message: `Failed fetching ${role} orders` };
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
    return { success: false, message: "Failed to delete order" };
  }
};

export const deleteOrderItemsByOrder = async (orderId) => {
  try {
    await pool.query(orderItemQueries.deleteOrderItemsByOrder, [orderId]);
    return { success: true };
  } catch (error) {
    console.error("Error deleting order items:", error.stack);
    return { success: false, message: "Failed to delete order items" };
  }
};