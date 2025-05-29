import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { checkConnection } from './src/config/db.js';
import createAllTables from './src/utils/dbUtils.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());

// Routes
server.use('/api/auth', authRoutes);

server.listen(port, async () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
    try {
        await checkConnection();
        await createAllTables();
    } catch (error) {
        console.error('Failed to initialize database', error);
    }
});