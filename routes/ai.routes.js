import express from 'express';
import { getBookInsights } from '../controller/ai.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();



router.get('/:bookId', protectRoute, getBookInsights);


export default router;

