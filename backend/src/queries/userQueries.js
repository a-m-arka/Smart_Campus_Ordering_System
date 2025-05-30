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
    SET profile_picture_url = ?
    WHERE id = ?;
  `,

  getStudentById: `
    SELECT id, name, email, phone, address, profile_picture_url, created_at
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

  updateLogo: `
    UPDATE Vendors
    SET logo_url = ?
    WHERE id = ?;
  `,

  getVendorById: `
    SELECT id, name, email, phone, stall_name, stall_location,
           logo_url, average_rating, review_count, created_at
    FROM Vendors
    WHERE id = ?;
  `,

  getVendorByEmail: `
    SELECT id, password
    FROM Vendors
    WHERE email = ?;
  `
};
