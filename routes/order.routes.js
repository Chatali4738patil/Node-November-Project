import express from 'express';
import { placeOrder, getUserOrders, getAllOrders, updateOrderStatus, getOrderHistory} from '../controller/order.controller.js';
import { protectRoute, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();



router.post('/placeorder', protectRoute, placeOrder);
//getUserOrders
router.get('/myorders', protectRoute, getUserOrders);
//getAllOrders
router.get('/allorders', protectRoute, isAdmin, getAllOrders);
//updateOrderStatus
router.put('/updateorder/:orderId', protectRoute, isAdmin, updateOrderStatus);
//getOrderHistory
router.get('/orderhistory', protectRoute, getOrderHistory);

export default router;

// testing api in postman then give

//690dcf6b4965badf102ee84a