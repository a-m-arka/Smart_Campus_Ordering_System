export const reviewQueries = {

  createReview: `
    INSERT INTO Reviews 
      (student_id, vendor_id, food_item_id, rating, comment)
    VALUES 
      (?, ?, ?, ?, ?);
  `,

  getReviewById: `
    SELECT
      id,
      student_id AS studentId,
      vendor_id AS vendorId,
      food_item_id AS itemId
    FROM Reviews
    WHERE id = ?
  `,

  getFoodItemReviews: `
    SELECT 
      r.id,
      r.rating,
      r.comment AS feedback,
      r.created_at AS postedAt,
      s.id AS studentId,
      s.name AS studentName,
      s.profile_picture_url AS studentImage
    FROM Reviews r
    JOIN Students s ON r.student_id = s.id
    WHERE r.food_item_id = ?
    ORDER BY r.created_at DESC;
  `,

  getVendorReviews: `
    SELECT 
      r.id,
      r.rating,
      r.comment AS feedback,
      r.created_at AS postedAt,
      s.id AS studentId,
      s.name AS studentName,
      s.profile_picture_url AS studentImage,
      f.name AS foodItemName,
      f.image_url AS itemImage
    FROM Reviews r
    JOIN Students s ON r.student_id = s.id
    LEFT JOIN FoodItems f ON r.food_item_id = f.id
    WHERE r.vendor_id = ?
    ORDER BY r.created_at DESC;
  `,

  getStudentReviews: `
    SELECT
      id AS reviewId,
      food_item_id AS itemId,
      rating,
      comment AS feedback
    FROM Reviews
    WHERE student_id = ?
    ORDER BY created_at DESC;
  `,

  updateReview: `
    UPDATE Reviews
    SET 
      rating = COALESCE(?, rating),
      comment = COALESCE(?, comment)
    WHERE id = ? AND student_id = ?;
  `,

};