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

export const updateVendorInfo = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    const { role, name, email, phone, stallName, stallLocation } = req.body;

    if (!role || role !== 'vendor') {
        return res.status(400).json({ message: 'Role is required and must be "vendor"' });
    }
    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: 'Invalid name' });
        }
    }
    if (email !== undefined) {
        if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }
    }
    if (phone !== undefined) {
        if (typeof phone !== 'string' || !/^01[3-9]\d{8}$/.test(phone)) {
            return res.status(400).json({ message: 'Invalid Bangladeshi phone number' });
        }
    }
    if (stallName !== undefined) {
        if (typeof stallName !== 'string' ||
            stallName.trim().length < 3 ||
            !/^[a-zA-Z0-9\s]+$/.test(stallName)) {
            return res.status(400).json({
                message: 'Stall name is required and must be at least 3 characters, using only letters, numbers, and spaces'
            });
        }
    }
    if (stallLocation !== undefined) {
        if (typeof stallLocation !== 'string' || stallLocation.trim() === '') {
            return res.status(400).json({ message: 'Invalid stall location' });
        }
    }

    try {
        const decodedToken = verifyToken(token);

        const validation = validateDecodedToken(decodedToken, 'vendor');
        if (!validation.valid) {
            return res.status(validation.statusCode).json({ message: validation.message });
        }
        const newInfo = { name, email, phone, stallName, stallLocation };
        const response = await vendorService.updateVendorInfo(decodedToken.id, role, newInfo);
        if (response.success) {
            return res.status(200).json({ message: 'Vendor info updated successfully' });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error('Error during updating vendor info:', error);
        return res.status(500).json({ message: 'Failed to update vendor info. Internal Server Error' });
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