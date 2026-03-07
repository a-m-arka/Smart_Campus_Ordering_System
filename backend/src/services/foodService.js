import * as foodUtils from '../utils/fooddUtils.js';
import * as imageUtils from '../utils/imageUtils.js';
import * as userUtils from '../utils/userUtils.js';

export const addFood = async (vendorId, foodItem, fileBuffer, fileName) => {
    try {
        const vendor = await userUtils.findUserById(vendorId, 'vendor');
        if (!vendor) {
            return { success: false, message: "Vendor not found" };
        }
        const uploadedImage = await imageUtils.uploadImage(fileBuffer, fileName);
        if (!uploadedImage.success) {
            return { success: false, message: "Error uploading food image", error: uploadedImage.error };
        }
        await foodUtils.addFoodItem(vendorId, foodItem, uploadedImage.result.secure_url, uploadedImage.result.public_id);
        return { success: true, message: "Food item added successfully" };
    } catch (error) {
        console.error('Error adding food item:', error);
        return { success: false, message: "Failed to add food item" };
    }
};