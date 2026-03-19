import express from 'express';
import * as reviewController from '../controllers/reviewController.js';

const router = express.Router();

router.post('/post-review', reviewController.createReview);
router.patch('/update-review/:reviewId', reviewController.updateReview);
router.get('/get-item-reviews/:itemId', reviewController.getItemReviews);
router.get('/get-vendor-reviews', reviewController.getVendorReviews);
router.get('/get-student-reviews', reviewController.getStudentReviews);

export default router;