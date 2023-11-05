import mongoose from "mongoose";
import Product from "../model/Product.js";
import User from "../model/User.js";

export const getAllProducts = async(req, res, next) => {
    let products;
    try{
        products = await Product.find();
    }catch(err){
        return console.log(err);
    }

    if(!products){
        return res.status(404).json({message: "No se han encontrado productos."})
    }

    return res.status(200).json({products});
}

export const addProduct = async(req, res, next) => {
    const{name, description, image, price, user} = req.body;
    let existingUser;

    try{
        existingUser = await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message:"No se puede encontrar al usuario por su ID"});
    }

    const product = new Product({
        name,
        description,
        image,
        price,
        user
    });

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await product.save({session});
        existingUser.products.push(product);
        await existingUser.save({session});
        await session.commitTransaction();
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err})
    }

    return res.status(200).json({product});
}

export const updateProduct = async(req, res, next) => {
    const{name, description, price} = req.body;
    const productId = req.params.id;
    let product;
    try{
        product = await Product.findByIdAndUpdate(productId,{
            name,
            description,
            price
        })
    }catch(err){
        return console.log(err);
    }

    if(!product){
        return res.status(500).json({message: "No se pudo actualizar el producto."})
    }
    return res.status(200).json({product});
}

export const getById =  async(req, res, next) => {
    const id = req.params.id;
    let product;

    try{
        product = await Product.findById(id);
    }catch(err){
        return console.log(err);
    }

    if(!product){
        return res.status(404).json({message: "No se pudo encontrar el producto."});
    }
    return res.status(200).json({product});
}

export const deleteProduct = async(req, res, next) => {
    const id = req.params.id;
    let product;

    try{
        product = await Product.findByIdAndDelete(id).populate('user');
        await product.user.products.pull(product);
        await product.user.save();
    }catch(err){
        return console.log(err);
    }

    if(!product){
        return res.status(404).json({message: "No se pudo borrar el producto."});
    }
    return res.status(200).json({message: "Producto eliminado"});
}

export const getByUserId = async(req, res, next) => {
    const userId = req.params.id;
    let userProducts;

    try{
        userProducts = await User.findById(userId).populate("products");
    }catch(err){
        return console.log(err);
    }

    if(!userProducts){
        return res.status(404).json({message: "No se pudieron encontrar productos."});
    }

    return res.status(200).json({products:userProducts});
}