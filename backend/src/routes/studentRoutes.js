import express from 'express';
import * as studentController from '../controllers/studentController.js';

const router = express.Router();

router.get('/get-student-data', studentController.getStudent);

export default router;