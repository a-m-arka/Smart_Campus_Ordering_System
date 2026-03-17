import express from 'express';
import * as reviewController from '../controllers/reviewController.js';

const router = express.Router();

router.post('/post-review', reviewController.createReview);

export default router;