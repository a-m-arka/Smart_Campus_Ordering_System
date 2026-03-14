import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/place-order', orderController.createOrder);
router.get('/get-orders/:userRole', orderController.getUserOrders);
router.patch('/update-status/:orderId', orderController.updateOrderStatus);

export default router;