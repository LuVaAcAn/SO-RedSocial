import mongoose from "mongoose";
import Product from "../model/Product.js";
import User from "../model/User.js";
import Comment from "../model/Comment.js";

export const addComment = async(req, res, next) => {
    const { text, rating } = req.body;
    const { productId } = req.params;
    let product;

    try {
        product = await Product.findById(productId);
    } catch (err) {
        return console.log(err);
    }

    if (!product) {
        return res.status(404).json({ message: "No se puede encontrar el producto por su ID" });
    }

    const comment = new Comment({
        text,
        rating,
        user: req.user._id, // Asegúrate de tener algún middleware que establezca req.user
        product: productId
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await comment.save({ session });
        product.comments.push(comment);
        await product.save({ session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }

    return res.status(200).json({ comment });
}

export const getCommentsByProductId = async(req, res, next) => {
    const { productId } = req.params;
    let product;

    try {
        product = await Product.findById(productId).populate('comments');
    } catch (err) {
        return console.log(err);
    }

    if (!product) {
        return res.status(404).json({ message: "No se puede encontrar el producto por su ID" });
    }

    return res.status(200).json({ comments: product.comments });
}