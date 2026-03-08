import express from 'express';
import upload from '../config/multer.js';
import * as foodController from '../controllers/foodController.js';

const router = express.Router();

router.post('/add-food', upload.single('file'), foodController.addFood);
router.put('/edit-food/:foodId', upload.single('file'), foodController.editFood);

export default router;