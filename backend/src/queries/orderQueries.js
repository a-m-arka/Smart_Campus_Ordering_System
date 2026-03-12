export const orderQueries = {
  createOrder: `
    INSERT INTO Orders
      (id, student_id, vendor_id, total_amount, payment_method, delivery_address)
    VALUES (?, ?, ?, ?, ?, ?);
  `,
  updateOrderStatus: `
    UPDATE Orders
    SET status = ?
    WHERE id = ?;
  `,
  updatePaymentStatus: `
    UPDATE Orders
    SET payment_status = ?
    WHERE id = ?;
  `,
  getOrderById: `
    SELECT * FROM Orders
    WHERE id = ?;
  `,
  getOrdersByStudent: `
    SELECT * FROM Orders
    WHERE student_id = ?
    ORDER BY order_time DESC;
  `,
  getOrdersByVendor: `
    SELECT * FROM Orders
    WHERE vendor_id = ?
    ORDER BY order_time DESC;
  `,
  deleteOrder: `
    DELETE FROM Orders
    WHERE id = ?;
  `
};

export const orderItemQueries = {
  addOrderItem: `
    INSERT INTO OrderItems (order_id, food_item_id, quantity, price)
    VALUES (?, ?, ?, ?);
  `,
  getOrderItemsByOrder: `
    SELECT * FROM OrderItems
    WHERE order_id = ?;
  `,
  deleteOrderItemsByOrder: `
    DELETE FROM OrderItems
    WHERE order_id = ?;
  `
};