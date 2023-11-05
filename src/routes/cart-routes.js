import express from 'express';
import * as cartController from '../controllers/cart-controller.js';

const cartRouter = express.Router();

// Rutas de carrito
cartRouter.post('/cart', cartController.addProductToCart);
cartRouter.get('/cart', cartController.getCartByUser);
cartRouter.delete('/cart/:productId', cartController.removeProductFromCart);
cartRouter.delete('/cart', cartController.clearCart);


export default cartRouter;