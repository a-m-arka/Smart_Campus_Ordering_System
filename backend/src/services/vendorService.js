import * as userUtils from '../utils/userUtils.js';

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