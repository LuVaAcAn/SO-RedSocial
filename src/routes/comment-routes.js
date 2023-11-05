import express from 'express';
import { addComment, getCommentsByProductId } from '../controllers/comment-controller.js';

const commentRouter = express.Router();

// Ruta para agregar un comentario a un producto
commentRouter.post('/product/:productId/comment', addComment);

// Ruta para obtener los comentarios de un producto por su ID
commentRouter.get('/product/:productId/comments', getCommentsByProductId);


export default commentRouter;