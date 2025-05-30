import * as vendorService from '../services/vendorService.js';
import { verifyToken } from '../utils/authUtils.js';

export const getVendor = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const decodedToken = verifyToken(token);
        if (!decodedToken || !decodedToken.id) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if( !decodedToken.role || decodedToken.role !== 'vendor') {
            return res.status(403).json({ message: 'Access denied. Not a vendor.' });
        }
        const response = await vendorService.getVendor(decodedToken.id);
        
        if (response.success) {
            return res.status(200).json({ data: response.data });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error('Error during getting vendor data:', error);
        return res.status(500).json({ message: 'Failed to get vendor data. Internal Server Error' });
    }
};