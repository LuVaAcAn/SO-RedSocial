import express from 'express';
import { addComment, getCommentsByProductId } from '../controllers/comment-controller.js';

const commentRouter = express.Router();

// Ruta para agregar un comentario a un producto
commentRouter.post('/products/:productId/comment', addComment);

// Ruta para obtener los comentarios de un producto por su ID
commentRouter.get('/products/:productId/comments', getCommentsByProductId);

export default commentRouter;