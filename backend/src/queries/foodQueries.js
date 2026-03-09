export const foodQueries = {
  addFoodItem: `
    INSERT INTO FoodItems
      (vendor_id, name, description, price, image_url, image_public_id, is_available, category, average_rating, review_count)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `,

  updateFoodItem: `
    UPDATE FoodItems
    SET 
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        price = COALESCE(?, price),
        image_url = COALESCE(?, image_url),
        image_public_id = COALESCE(?, image_public_id),
        is_available = COALESCE(?, is_available),
        category = COALESCE(?, category)
    WHERE id = ?;
  `,

  deleteFoodItem: `
    DELETE FROM FoodItems
    WHERE id = ?;
  `,

  getAllFoodItems: `
    SELECT 
        f.id,
        f.name AS title,
        f.price,
        f.category,
        f.description,
        f.image_url AS image,
        f.is_available AS isAvailable,
        f.average_rating AS rating,
        f.review_count AS reviewCount,
        v.id AS vendorId,
        v.stall_name AS vendor,
        v.stall_location AS vendorLocation,
        v.logo_url AS vendorLogo,
        v.average_rating AS vendorRating,
        v.review_count AS vendorReviewCount
    FROM FoodItems f
    JOIN Vendors v ON f.vendor_id = v.id;
  `,

  getVendorMenu: `
    SELECT 
        f.id,
        f.name AS title,
        f.price,
        f.category,
        f.description,
        f.image_url AS image,
        f.is_available AS isAvailable,
        f.average_rating AS rating,
        f.review_count AS reviewCount,
        (SELECT SUM(quantity) FROM OrderItems oi 
         JOIN Orders o ON oi.order_id = o.id 
         WHERE oi.food_item_id = f.id) AS orderCount
    FROM FoodItems f
    WHERE f.vendor_id = ?;
  `,

  getFoodItemById: `
    SELECT *
    FROM FoodItems
    WHERE id = ?;
  `,
};