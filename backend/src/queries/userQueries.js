export const studentQueries = {
  createStudent: `
    INSERT INTO Students (name, email, password, phone)
    VALUES (?, ?, ?, ?);
  `,

  updateStudent: `
    UPDATE Students
    SET
      name = COALESCE(?, name),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      address = COALESCE(?, address)
    WHERE id = ?;
  `,

  updateProfilePicture: `
    UPDATE Students
    SET
      profile_picture_url = ?,
      profile_picture_public_id = ?
    WHERE id = ?;
  `,

  changePassword: `
    UPDATE Students
    SET password = ?
    WHERE id = ?;
  `,

  getStudentById: `
    SELECT id, password, name, email, phone, address, profile_picture_url, profile_picture_public_id, created_at
    FROM Students
    WHERE id = ?;
  `,

  getStudentByEmail: `
    SELECT id, password
    FROM Students
    WHERE email = ?;
  `
};

export const vendorQueries = {
  createVendor: `
    INSERT INTO Vendors (name, email, password, phone, stall_name)
    VALUES (?, ?, ?, ?, ?);
  `,

  updateVendor: `
    UPDATE Vendors
    SET
      name = COALESCE(?, name),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      stall_name = COALESCE(?, stall_name),
      stall_location = COALESCE(?, stall_location)
    WHERE id = ?;
  `,

  updateVendorRating: `
    UPDATE Vendors v
    SET 
        v.review_count = (
            SELECT COUNT(*) 
            FROM Reviews r 
            WHERE r.vendor_id = v.id
        ),
        v.average_rating = (
            SELECT IFNULL(AVG(rating), 0) 
            FROM Reviews r 
            WHERE r.vendor_id = v.id
        )
    WHERE v.id = ?;
  `,

  updateLogo: `
    UPDATE Vendors
    SET
      logo_url = ?,
      logo_public_id = ?
    WHERE id = ?;
  `,

  changePassword: `
    UPDATE Vendors
    SET password = ?
    WHERE id = ?;
  `,

  getVendorById: `
    SELECT 
        v.id,
        v.password,
        v.name,
        v.email,
        v.phone,
        v.stall_name,
        v.stall_location,
        v.logo_url,
        v.logo_public_id,
        v.average_rating,
        v.review_count,
        v.is_open,
        (SELECT COUNT(*) 
         FROM FoodItems f 
         WHERE f.vendor_id = v.id) AS totalFoodItems,
        (SELECT COUNT(*) 
         FROM Orders o 
         WHERE o.vendor_id = v.id) AS totalOrders
    FROM Vendors v
    WHERE v.id = ?;
  `,

  getVendorByEmail: `
    SELECT id, password
    FROM Vendors
    WHERE email = ?;
  `,

  getAllVendors: `
    SELECT 
      id,
      stall_name AS name,
      stall_location AS location,
      average_rating AS rating,
      logo_url AS image,
      is_open AS isOpen
    FROM Vendors;
  `,
};