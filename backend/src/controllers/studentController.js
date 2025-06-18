import * as studentService from '../services/studentService.js';
import { verifyToken } from '../utils/authUtils.js';

export const getStudent = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const decodedToken = verifyToken(token);

        if (decodedToken.error) {
            return res.status(401).json({ message: decodedToken.error });
        }

        if (!decodedToken.id) {
            return res.status(401).json({ message: 'Invalid token payload' });
        }

        if (!decodedToken.role || decodedToken.role !== 'student') {
            return res.status(403).json({ message: 'Access denied. Not a student.' });
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
