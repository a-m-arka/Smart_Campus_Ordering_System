import { verifyPassword, generateToken, changeUserPassword } from "../utils/authUtils.js";
import { findUserByEmail, findUserById, createUser } from "../utils/userUtils.js";

export const registerUser = async (user, role) => {
    try {
        const existingUser = await findUserByEmail(user.email, role);
        if (existingUser) {
            return { success: false, message: "User with this email already exists" };
        }

        await createUser(user, role);
        return { success: true, message: "Registered successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Registration failed. Please try again" };
    }
};

export const loginUser = async (email, password, role) => {
    // console.log(email, password, role);
    try {
        const user = await findUserByEmail(email, role);
        if (!user) {
            return { success: false, message: "User not found" };
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid password" };
        }

        const token = generateToken(user, role);
        return { success: true, message: "Login successful", token };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Login failed. Please try again" };
    }
};

export const changePassword = async (userId, currentPassword, newPassword, role) => {
    try {
        const user = await findUserById(userId, role);
        if (!user) {
            return { success: false, message: "User not found" };
        }
        const isPasswordValid = await verifyPassword(currentPassword, user.password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid current password" };
        }
        const response = await changeUserPassword(userId, newPassword, role);
        if(response.success) {
            return { success: true, message: response.message };
        }
        return { success: false, message: response.message };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to change password" };
    }
};