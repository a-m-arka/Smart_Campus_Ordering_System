import express from 'express';
import * as publicController from '../controllers/publicController.js';

const router = express.Router();

router.get('/food-items', publicController.getAllFoods);
router.get('/vendors', publicController.getAllVendors);
router.get('/vendor-menu/:vendorId', publicController.getVendorMenu);

export default router;