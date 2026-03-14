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
    SELECT 
      o.id AS orderId,
      o.delivery_address AS deliveryAddress,
      o.total_amount AS totalAmount,
      o.status,
      o.payment_status AS paymentStatus,
      o.payment_method AS paymentMethod,
      o.order_time AS orderTime,

      s.id AS studentId,
      s.name AS studentName,
      s.phone AS studentPhone,

      v.id AS vendorId,
      v.name AS vendorName,
      v.phone AS vendorPhone,
      v.stall_name AS stallName,
      v.stall_location AS stallLocation,

      oi.food_item_id AS foodItemId,
      oi.quantity,
      oi.price,

      f.name AS itemName,
      f.image_url AS imageUrl

    FROM Orders o
    JOIN Students s ON o.student_id = s.id
    JOIN Vendors v ON o.vendor_id = v.id
    JOIN OrderItems oi ON o.id = oi.order_id
    JOIN FoodItems f ON oi.food_item_id = f.id

    WHERE o.id = ?;
  `,

  getOrdersByStudent: `
    SELECT 
      o.id AS orderId,
      o.delivery_address AS deliveryAddress,
      o.total_amount AS totalAmount,
      o.status,
      o.payment_status AS paymentStatus,
      o.payment_method AS paymentMethod,
      o.order_time AS orderTime,

      s.id AS studentId,
      s.name AS studentName,
      s.phone AS studentPhone,

      v.id AS vendorId,
      v.name AS vendorName,
      v.phone AS vendorPhone,
      v.stall_name AS stallName,
      v.stall_location AS stallLocation,

      oi.food_item_id AS foodItemId,
      oi.quantity,
      oi.price,

      f.name AS itemName,
      f.image_url AS imageUrl

    FROM Orders o
    JOIN Students s ON o.student_id = s.id
    JOIN Vendors v ON o.vendor_id = v.id
    JOIN OrderItems oi ON o.id = oi.order_id
    JOIN FoodItems f ON oi.food_item_id = f.id

    WHERE o.student_id = ?
    ORDER BY o.order_time DESC;
  `,

  getOrdersByVendor: `
    SELECT 
      o.id AS orderId,
      o.delivery_address AS deliveryAddress,
      o.total_amount AS totalAmount,
      o.status,
      o.payment_status AS paymentStatus,
      o.payment_method AS paymentMethod,
      o.order_time AS orderTime,

      s.id AS studentId,
      s.name AS studentName,
      s.phone AS studentPhone,

      v.id AS vendorId,
      v.name AS vendorName,
      v.phone AS vendorPhone,
      v.stall_name AS stallName,
      v.stall_location AS stallLocation,

      oi.food_item_id AS foodItemId,
      oi.quantity,
      oi.price,

      f.name AS itemName,
      f.image_url AS imageUrl

    FROM Orders o
    JOIN Students s ON o.student_id = s.id
    JOIN Vendors v ON o.vendor_id = v.id
    JOIN OrderItems oi ON o.id = oi.order_id
    JOIN FoodItems f ON oi.food_item_id = f.id

    WHERE o.vendor_id = ?
    ORDER BY o.order_time DESC;
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