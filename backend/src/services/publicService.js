import * as foodUtils from "../utils/foodUtils.js";
import { getAllUsers, getTopVendors } from "../utils/userUtils.js";

export const getAllFoods = async () => {
    try {
        const foodItems = await foodUtils.getAllFoodItems();
        if(foodItems){
            return { success: true, data: foodItems };
        }
        return { success: false, message: 'Failed to get all food items' };
    } catch (error) {
        console.error('Error getting food items:', error);
        return { success: false, message: 'Failed to get all food items' };
    }
};

export const getAllVendors = async () => {
    try {
        const vendors = await getAllUsers('vendor');
        if(vendors.error){
            return { success: false, message: 'Failed to get all vendors' };
        }
        return { success: true, data: vendors };
    } catch (error) {
        console.error('Error getting all vendors:', error);
        return { success: false, message: 'Failed to get all vendors' };
    }
};

export const getVendorMenu = async (vendorId) => {
    try {
        const vendorMenu = await foodUtils.getVendorMenu(vendorId);
        if(vendorMenu){
            return { success: true, data: vendorMenu };
        }
        return { success: false, message: 'Failed to get vendor menu' };
    } catch (error) {
        console.error('Error getting vendor menu:', error);
        return { success: false, message: 'Failed to get vendor menu' };
    }
};

export const getTopFoodsAndVendors = async () => {
    try{
        const topFoods = await foodUtils.getTopFoodItems();
        const topVendors = await getTopVendors();
        if(topFoods.error || topVendors.error){
            return { success: false, message: 'Failed to get top foods and vendors' };
        }
        return { success: true, data: { topFoods, topVendors } };
    }catch(error){
        console.error('Error getting top foods and vendors in public service:', error);
        return { success: false, message: 'Failed to get top foods and vendors' };
    }
};