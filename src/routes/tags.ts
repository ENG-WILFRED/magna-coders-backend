import express from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticateToken } from '../middleware/auth';
import { getAllTags, getPopularTags, createTag, getAllCategories } from '../controllers/tags';

const router = express.Router();

router.get('/', asyncHandler(getAllTags));
router.get('/popular', asyncHandler(getPopularTags));
router.post('/', authenticateToken, asyncHandler(createTag));
router.get('/categories', asyncHandler(getAllCategories));

export default router;
