import express from 'express';
import upload from '../config/multer.js';
import * as vendorController from '../controllers/vendorController.js';

const router = express.Router();

router.get('/get-vendor-data', vendorController.getVendor);
router.put('/update-vendor-info', vendorController.updateVendorInfo);
router.put('/update-logo', upload.single('file'), vendorController.updateVendorLogo);
router.get('/menu', vendorController.getVendorMenu);

export default router;