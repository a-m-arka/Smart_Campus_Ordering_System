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
      password = COALESCE(?, password),
      address = COALESCE(?, address)
    WHERE id = ?;
  `,

  updateProfilePicture: `
    UPDATE Students
    SET profile_picture_url = ?
    WHERE id = ?;
  `,

  getStudentById: `
    SELECT *
    FROM Students
    WHERE id = ?;
  `,

  getStudentByEmail: `
    SELECT *
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
      password = COALESCE(?, password),
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
    SELECT *
    FROM Vendors
    WHERE id = ?;
  `,

  getVendorByEmail: `
    SELECT *
    FROM Vendors
    WHERE email = ?;
  `
};
