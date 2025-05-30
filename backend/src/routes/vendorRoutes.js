import express from 'express';
import * as vendorController from '../controllers/vendorController.js';

const router = express.Router();

router.get('/get-vendor-data', vendorController.getVendor);

export default router;