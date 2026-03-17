import { pool } from '../config/db.js';
import { studentQueries, vendorQueries } from '../queries/userQueries.js';
import { hashPassword } from './authUtils.js';


export const createUser = async (user, role) => {
    const query = role === 'student' ? studentQueries.createStudent : vendorQueries.createVendor;
    const hashedPassword = await hashPassword(user.password);
    const values = [
        user.name,
        user.email,
        hashedPassword,
        user.phone,
        ...(role === 'vendor' ? [user.stallName] : [])
    ];
    await pool.query(query, values);
};

export const findUserByEmail = async (email, role) => {
    const query = role === 'student' ? studentQueries.getStudentByEmail : vendorQueries.getVendorByEmail;
    const [result] = await pool.query(query, [email]);
    return result.length > 0 ? result[0] : null;
};

export const findUserById = async (id, role) => {
    try {
        const query = role === 'student' ? studentQueries.getStudentById : vendorQueries.getVendorById;
        const [result] = await pool.query(query, [id]);
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error("Error details:", error.stack);
        return null;
    }
};

export const updateUserImage = async (id, role, imageUrl, publicId) => {
  try {
    const query =
      role === 'student'
        ? studentQueries.updateProfilePicture
        : vendorQueries.updateLogo;

    const [result] = await pool.query(query, [imageUrl, publicId, id]);
    return { success: true, result };
  } catch (error) {
    console.error("Error updating user image:", error.stack);
    return { success: false, message: "Failed to update image", error };
  }
};

export const updateUserInfo = async (id, role, userInfo) => {
    try {
        let query;
        let values;
        if(role === 'student'){
            query = studentQueries.updateStudent;
            values = [
                userInfo.name,
                userInfo.email,
                userInfo.phone,
                userInfo.address,
                id
            ];
        }
        else{
            query = vendorQueries.updateVendor;
            values = [
                userInfo.name,
                userInfo.email,
                userInfo.phone,
                userInfo.stallName,
                userInfo.stallLocation,
                id
            ];
        }
        await pool.query(query, values);
        return { success: true };
    } catch (error) {
        console.error(`Error updating ${role} info:`, error.stack);
        return { success: false, message: `Failed to update ${role} info` };
    }
};

export const updateVendorRating = async (conn, vendorId) => {
    try {
        await conn.query(vendorQueries.updateVendorRating, [vendorId]);
        return { success: true };
    } catch (error) {
        console.error("Error updating vendor rating:", error.stack);
        return { success: false, message: "Failed to update vendor rating", error };
    }
};
 
export const getAllUsers = async (role = 'vendor') => {
    try {
        let query;
        if (role === 'vendor'){
            query = vendorQueries.getAllVendors;
        }
        else{
            return {error: true};
        }
        const [result] = await pool.query(query);
        return result;
    } catch (error) {
        console.error(`Error fetching all ${role}s:`, error.stack);
        return {error: true};
    }
};
