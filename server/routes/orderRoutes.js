import express from 'express'
import admin from '../middleware/adminMiddleware.js'
import protect from '../middleware/authMiddleware.js'
import { createOrder, getOrders, myOrders , updateOrderStatus } from '../controller/orderController.js'

const router = express.Router();

router.route("/").get(protect, admin, getOrders).post(protect, createOrder);

router.route("/myorders").get(protect, myOrders);

router.route("/:id/status").put(protect, admin, updateOrderStatus);

export default router;