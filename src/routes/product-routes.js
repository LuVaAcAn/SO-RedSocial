import express from 'express';
import * as productController from '../controllers/product-controller.js';

const productRouter = express.Router();

// Rutas de productos
productRouter.get('/products', productController.getAllProducts);
productRouter.post('/products', productController.addProduct);
productRouter.get('/products/:id', productController.getById);
productRouter.put('/products/:id', productController.updateProduct);
productRouter.delete('/products/:id', productController.deleteProduct);


export default productRouter;