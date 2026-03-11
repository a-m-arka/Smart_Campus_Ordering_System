import express from 'express';
import upload from '../config/multer.js';
import * as studentController from '../controllers/studentController.js';

const router = express.Router();

router.get('/get-student-data', studentController.getStudent);
router.put('/update-student-info', studentController.updateStudentInfo);
router.put('/update-profile-picture', upload.single('file'), studentController.updateStudentImage);

export default router;