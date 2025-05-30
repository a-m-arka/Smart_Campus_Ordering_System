import * as userUtils from '../utils/userUtils.js';

export const getStudent = async (id) => {
    try {
        const student = await userUtils.findUserById(id, 'student');
        if (!student) {
            return { success: false, message: "Invalid token" };
        }
        return { success: true, data: student };
    } catch (error) {
        console.error("Error fetching student data:", error);
        return { success: false, message: "Failed to fetch student data" };
    }
};