import * as publicService from '../services/publicService.js';
import { findUserById } from '../utils/userUtils.js';

export const getAllFoods = async (req, res) => {
    try {
        const response = await publicService.getAllFoods();
        if(response.success){
            return res.status(200).json({ data : response.data });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error('Error getting food items:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllVendors = async (req, res) => {
    try {
        const response = await publicService.getAllVendors();
        if(response.success){
            return res.status(200).json({ data : response.data });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error('Error getting vendors:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getVendorMenu = async (req, res) => {
    const { vendorId } = req.params;
    try {
        const vendor = await findUserById(vendorId, 'vendor');
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        const response = await publicService.getVendorMenu(vendorId);
        if(response.success){
            return res.status(200).json({ data : response.data });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error('Error getting vendor menu:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};