import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";


const orderRouter = express.Router();

orderRouter.post('/createOrder', createOrder);
orderRouter.get('/all-orders', getOrders);

export default orderRouter;