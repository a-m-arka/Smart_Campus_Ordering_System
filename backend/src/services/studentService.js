import * as userUtils from '../utils/userUtils.js';
import * as imageUtils from '../utils/imageUtils.js';

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

export const updateStudentImage = async (id, fileBuffer, fileName) => {
    try {
        const student = await userUtils.findUserById(id, 'student');
        if (!student) {
            return { success: false, message: "Student not found" };
        }
        const currentImageId = student.profile_picture_public_id;
        if(currentImageId){
            const deleteResult = await imageUtils.deleteImage(currentImageId);
            if(!deleteResult.success){
                return { success: false, message: "Error deleting old profile picture", error: deleteResult.error };
            }
        }
        const uploadedImage = await imageUtils.uploadImage(fileBuffer, fileName);
        if(!uploadedImage.success){
            return {success: false, message: "Error uploading new profile picture", error: uploadedImage.error};
        }
        const result = await userUtils.updateUserImage(id, 'student', uploadedImage.result.secure_url, uploadedImage.result.public_id);
        return result;
    } catch (error) {
        console.error("Error updating student profile picture:", error);
        return { success: false, message: "Failed to update student profile picture" };
    }
};