import mongoose from "mongoose";
import Product from "../model/Product.js";

export const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({products});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Error al obtener los productos"});
    }
}

export const addProduct = async(req, res) => {
    const {name, description, image, price} = req.body;

    const product = new Product({
        name,
        description,
        image,
        price
    });

    try {
        await product.save();
        return res.status(200).json({product});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Error al agregar el producto"});
    }
}

export const updateProduct = async(req, res) => {
    const {name, description, price} = req.body;
    const productId = req.params.id;

    try {
        const product = await Product.findByIdAndUpdate(productId, {name, description, price}, {new: true});
        if (!product) {
            return res.status(404).json({message: "Producto no encontrado"});
        }
        return res.status(200).json({product});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Error al actualizar el producto"});
    }
}

export const getById = async(req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({message: "Producto no encontrado"});
        }
        return res.status(200).json({product});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Error al obtener el producto"});
    }
}

export const deleteProduct = async(req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: "Producto no encontrado"});
        }
        return res.status(200).json({message: "Producto eliminado"});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Error al eliminar el producto"});
    }
}