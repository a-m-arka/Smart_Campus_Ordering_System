import StudentModel from "../models/studentModel.js";
import VendorModel from "../models/vendorModel.js";
import { registerUser, loginUser } from "../services/authService.js";

export const register = async (req, res) => {
    const { role, name, email, phone, password, confirmPassword, stallName } = req.body;

    if (!role || !name || !email || !phone || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (role !== 'student' && role !== 'vendor') {
        return res.status(400).json({ message: 'Invalid role' });
    }

    if (role === 'vendor') {
        if (
            !stallName ||                           
            typeof stallName !== 'string' ||         
            stallName.trim().length < 3 ||           
            !/^[a-zA-Z0-9\s]+$/.test(stallName)      
        ) {
            return res.status(400).json({
                message: 'Stall name is required and must be at least 3 characters, using only letters, numbers, and spaces'
            });
        }
    }


    if ((role === 'student' && !/^u\d{7}@student\.cuet\.ac\.bd$/.test(email))) {
        return res.status(400).json({ message: 'Invalid student email format' });
    }

    if ((role === 'vendor' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        return res.status(400).json({ message: 'Invalid vendor email format' });
    }

    if (!/^01[3-9]\d{8}$/.test(phone)) {
        return res.status(400).json({ message: 'Invalid Bangladeshi phone number' });
    }

    if (!/^.{8,}$/.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    let user;
    if (role === 'student') {
        user = new StudentModel({ name, email, phone, password });
    } else {
        user = new VendorModel({ name, email, phone, password, stallName });
    }

    try {
        const response = await registerUser(user, role);
        if (response.success) {
            console.log(`New ${role} registered successfully`);
            return res.status(201).json({ message: response.message });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Registration failed. Internal Server Error' });
    }
};

export const login = async (req, res) => {
    const { role, email, password } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (role !== 'student' && role !== 'vendor') {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const response = await loginUser(email, password, role);
        if (response.success) {
            console.log(`A ${role} logged in successfully`);
            return res.status(200).json({ message: response.message, token: response.token });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Login failed. Internal Server Error' });
    }
};