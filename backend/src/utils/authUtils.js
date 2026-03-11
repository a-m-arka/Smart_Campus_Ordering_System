import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { studentQueries, vendorQueries } from "../queries/userQueries.js";
import { pool } from "../config/db.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (password, hashedPassword) => {

    // console.log("Plain:", password);
    // console.log("Hashed:", hashedPassword); // Debugging: Check if this is undefined

    try {
        if (!hashedPassword) {
        throw new Error("Password not found for user");
    }

    return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error verifying password:", error);
        return false; // Return false if there's an error during verification
    }
};

export const generateToken = (user, role) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
};


export const verifyToken = (token) => {
    try {
        return jwt.verify(token.trim(), JWT_SECRET);
    } catch (error) {
        return { error: 'Invalid or expired token' };
    }
};

export const validateDecodedToken = (decodedToken, requiredRole) => {
    if (!decodedToken) {
        return { valid: false, statusCode: 401, message: 'Invalid token' };
    }

    if (decodedToken.error) {
        return { valid: false, statusCode: 401, message: decodedToken.error };
    }

    if (!decodedToken.id) {
        return { valid: false, statusCode: 401, message: 'Invalid token payload' };
    }

    if (requiredRole && (!decodedToken.role || decodedToken.role !== requiredRole)) {
        return { valid: false, statusCode: 403, message: `Access denied. Not a ${requiredRole}.` };
    }

    return { valid: true };
};

export const changeUserPassword = async (userId, newPassword, role) => {
    try {
        const hashedPassword = await hashPassword(newPassword);
        const query = role === 'student' ? studentQueries.changePassword : vendorQueries.changePassword;
        await pool.query(query, [hashedPassword, userId]);
        return { success: true, message: 'Password changed successfully' };
    } catch (error) {
        console.error('Error changing password:', error);
        return { success: false, message: 'Failed to change password. Please try again' };
    }
};