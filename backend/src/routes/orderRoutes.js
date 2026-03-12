import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/place-order', orderController.createOrder);

export default router;