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

  updateFoodItemRating: `
    UPDATE FoodItems f
    SET 
        f.review_count = (
            SELECT COUNT(*) 
            FROM Reviews r 
            WHERE r.food_item_id = f.id
        ),
        f.average_rating = (
            SELECT IFNULL(AVG(rating), 0) 
            FROM Reviews r 
            WHERE r.food_item_id = f.id
        )
    WHERE f.id = ?;
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
      v.stall_name AS vendorName,
      v.stall_location AS vendorLocation,
      v.average_rating AS vendorRating,
      v.logo_url AS vendorLogo,
      (SELECT SUM(quantity) 
        FROM OrderItems oi 
        JOIN Orders o ON oi.order_id = o.id 
        WHERE oi.food_item_id = f.id) AS orderCount
    FROM FoodItems f
    JOIN Vendors v ON f.vendor_id = v.id
    WHERE f.vendor_id = ?;
  `,

  getFoodItemById: `
    SELECT 
      f.*,
      v.stall_name AS vendorName,
      v.stall_location AS vendorLocation
    FROM FoodItems f
    JOIN Vendors v ON f.vendor_id = v.id
    WHERE f.id = ?;
  `
};