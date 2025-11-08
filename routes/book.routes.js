import express from 'express';
import { addBook, getBooks, getBookById, updateBook, deleteBook } from '../controller/book.controller.js';
import {upload} from '../middleware/upload.middleware.js';
import { protectRoute, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();



router.post('/addbook',protectRoute, isAdmin,upload.single("image") ,addBook);
router.get('/', getBooks);
router.get('/:id', getBookById);

router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;