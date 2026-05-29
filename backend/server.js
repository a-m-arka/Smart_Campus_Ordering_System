import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { checkConnection } from './src/config/db.js';
import createAllTables from './src/utils/dbUtils.js';
import publicRoutes from './src/routes/publicRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';
import vendorRoutes from './src/routes/vendorRoutes.js';
import foodRoutes from './src/routes/foodRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';

dotenv.config();

const server = express();
const port = process.env.PORT || 4000;

server.set('trust proxy', 1);

server.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

server.use(express.json());

server.use('/api/public', publicRoutes);
server.use('/api/auth', authRoutes);
server.use('/api/student', studentRoutes);
server.use('/api/vendor', vendorRoutes);
server.use('/api/food', foodRoutes);
server.use('/api/order', orderRoutes);
server.use('/api/review', reviewRoutes);

const startServer = async () => {
    try {
        await checkConnection();
        await createAllTables();

        server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to initialize database', error);
    }
};

startServer();