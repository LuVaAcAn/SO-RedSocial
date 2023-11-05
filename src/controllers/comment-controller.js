import mongoose from "mongoose";
import Product from "../model/Product.js";
import Comment from "../model/Comment.js";

export const addComment = async (req, res, next) => {
    const { text, rating, userId } = req.body;
    const { productId } = req.params;

    let product;

    try {
        product = await Product.findById(productId);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error al buscar el producto por su ID" });
    }

    if (!product) {
        return res.status(404).json({ message: "No se puede encontrar el producto por su ID" });
    }

    const comment = new Comment({
        text,
        rating,
        user: userId, // Utiliza el ID de usuario proporcionado en la solicitud.
        product: productId,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await comment.save({ session });
        product.comments.push(comment);
        await product.save({ session });
        await session.commitTransaction();
        session.endSession();
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: "Error al guardar el comentario" });
    }

    return res.status(200).json({ comment });
}

export const getCommentsByProductId = async (req, res, next) => {
    const { productId } = req.params;
    let product;

    try {
        product = await Product.findById(productId).populate('comments');
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error al buscar comentarios por ID de producto" });
    }

    if (!product) {
        return res.status(404).json({ message: "No se puede encontrar el producto por su ID" });
    }

    return res.status(200).json({ comments: product.comments });
}