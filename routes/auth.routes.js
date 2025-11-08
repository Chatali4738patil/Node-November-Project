import express from 'express';
import {signup, login } from '../controller/user.controller.js';

const router = express.Router();

// router.post('/login', (req, res) => {
//     // Login logic here
//     res.send('Login route');
// });


router.post('/signup', signup);
router.post('/login', login);

export default router;