import * as foodUtils from '../utils/foodUtils.js';
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

export const editFood = async (vendorId, foodId, updateData, fileBuffer, fileName) => {
    try {
        const vendor = await userUtils.findUserById(vendorId, 'vendor');
        if (!vendor) {
            return { success: false, message: "Vendor not found" };
        }
        const existingFood = await foodUtils.getFoodItemById(foodId);
        if(!existingFood){
            return { success: false, message: "Food item not found" };
        }
        let newImageUrl = null;
        let newImagePublicId = null;
        if(fileBuffer && fileName){
            const deleteResult = await imageUtils.deleteImage(existingFood.image_public_id);
            if(!deleteResult.success){
                return { success: false, message: "Error deleting old food image", error: deleteResult.error };
            }
            const uploadedImage = await imageUtils.uploadImage(fileBuffer, fileName);
            if (!uploadedImage.success) {
                return { success: false, message: "Error uploading new food image", error: uploadedImage.error };
            }
            newImageUrl = uploadedImage.result.secure_url;
            newImagePublicId = uploadedImage.result.public_id;
        }
        await foodUtils.updateFoodItem(foodId, updateData, newImageUrl, newImagePublicId);
        return { success: true, message: "Food item updated successfully" };
    } catch (error) {
        console.error('Error editing food item:', error);
        return { success: false, message: "Failed to edit food item" };
    }
};