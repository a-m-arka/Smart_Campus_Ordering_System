import * as userUtils from '../utils/userUtils.js';
import * as imageUtils from '../utils/imageUtils.js';
import * as foodUtils from '../utils/foodUtils.js';

export const getVendor = async (id) => {
    try {
        const vendor = await userUtils.findUserById(id, 'vendor');
        if (!vendor) {
            return { success: false, message: "Invalid token" };
        }
        // console.log(vendor);
        return { success: true, data: vendor };
    } catch (error) {
        console.error("Error fetching vendor data:", error);
        return { success: false, message: "Failed to fetch vendor data" };
    }
};

export const updateVendorLogo = async (id, fileBuffer, fileName) => {
    try {
        const vendor = await userUtils.findUserById(id, 'vendor');
        if (!vendor) {
            return { success: false, message: "Vendor not found" };
        }
        const currentImageId = vendor.logo_public_id;
        if(currentImageId){
            const deleteResult = await imageUtils.deleteImage(currentImageId);
            if(!deleteResult.success){
                return { success: false, message: "Error deleting old logo", error: deleteResult.error };
            }
        }
        const uploadedImage = await imageUtils.uploadImage(fileBuffer, fileName);
        if(!uploadedImage.success){
            return {success: false, message: "Error uploading new logo", error: uploadedImage.error};
        }
        const result = await userUtils.updateUserImage(id, 'vendor', uploadedImage.result.secure_url, uploadedImage.result.public_id);
        return result;
    } catch (error) {
        console.error("Error updating vendor logo:", error);
        return { success: false, message: "Failed to update vendor logo" };
    }
};

export const getVendorMenu = async (vendorId) => {
    try {
        const vendorMenu = await foodUtils.getVendorMenu(vendorId);
        if(!vendorMenu){
            return { success: false, message: "Vendor menu not found" };
        }
        return { success: true, data: vendorMenu };
    } catch (error) {
        console.error("Error fetching vendor menu:", error);
        return { success: false, message: "Failed to fetch vendor menu" };
    }
};