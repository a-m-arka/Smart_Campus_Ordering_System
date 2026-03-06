import * as studentService from '../services/studentService.js';
import { verifyToken, validateDecodedToken } from '../utils/authUtils.js';

export const getStudent = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const decodedToken = verifyToken(token);

        const validation = validateDecodedToken(decodedToken, 'student');
        if (!validation.valid) {
            return res.status(validation.statusCode).json({ message: validation.message });
        }

        const response = await studentService.getStudent(decodedToken.id);

        if (response.success) {
            return res.status(200).json({ data: response.data });
        }

        return res.status(400).json({ message: response.message });

    } catch (error) {
        console.error('Error during getting student data:', error);
        return res.status(500).json({ message: 'Failed to get student data. Internal Server Error' });
    }
};

export const updateStudentImage = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const decodedToken = verifyToken(token);

        const validation = validateDecodedToken(decodedToken, 'student');
        if (!validation.valid) {
            return res.status(validation.statusCode).json({ message: validation.message });
        }

        const fileBuffer = req.file.buffer;
        const timestamp = Date.now();
        const originalName = req.file.originalname.replace(/\s+/g, '_');
        const fileName = `students/${timestamp}-${originalName}`;

        const response = await studentService.updateStudentImage(decodedToken.id, fileBuffer, fileName);

        if (response.success) {
            return res.status(200).json({ data: response.data });
        }

        return res.status(400).json({ message: response.message });

    } catch (error) {
        console.error('Error during getting student data:', error);
        return res.status(500).json({ message: 'Failed to get student data. Internal Server Error' });
    }
};
