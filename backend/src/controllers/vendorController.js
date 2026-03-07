import * as vendorService from '../services/vendorService.js';
import { verifyToken, validateDecodedToken } from '../utils/authUtils.js';

export const getVendor = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const decodedToken = verifyToken(token);

        const validation = validateDecodedToken(decodedToken, 'vendor');
        if (!validation.valid) {
            return res.status(validation.statusCode).json({ message: validation.message });
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

export const updateVendorLogo = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const decodedToken = verifyToken(token);

        const validation = validateDecodedToken(decodedToken, 'vendor');
        if (!validation.valid) {
            return res.status(validation.statusCode).json({ message: validation.message });
        }

        const fileBuffer = req.file.buffer;
        const timestamp = Date.now();
        const originalName = req.file.originalname.replace(/\s+/g, '_');
        const fileName = `vendors/${timestamp}-${originalName}`;

        const response = await vendorService.updateVendorLogo(decodedToken.id, fileBuffer, fileName);

        if (response.success) {
            return res.status(200).json({ data: response.data });
        }

        return res.status(400).json({ message: response.message });

    } catch (error) {
        console.error('Error during getting vendor data:', error);
        return res.status(500).json({ message: 'Failed to get vendor data. Internal Server Error' });
    }
};

export const getVendorMenu = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const decodedToken = verifyToken(token);

        const validation = validateDecodedToken(decodedToken, 'vendor');
        if (!validation.valid) {
            return res.status(validation.statusCode).json({ message: validation.message });
        }

        const response = await vendorService.getVendorMenu(decodedToken.id);
        
        if (response.success) {
            return res.status(200).json({ data: response.data });
        }
        
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error('Error during getting vendor menu:', error);
        return res.status(500).json({ message: 'Failed to get vendor menu. Internal Server Error' });
    }
};