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
