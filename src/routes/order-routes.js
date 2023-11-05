import express from 'express';
import * as orderController from '../controllers/order-controller.js';

const orderRouter = express.Router();

// Rutas de pedidos
orderRouter.post('/orders', orderController.createOrder);
orderRouter.get('/orders', orderController.getOrdersByUser);



export default orderRouter;