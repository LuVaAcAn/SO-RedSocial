// controllers/cart-controller.js
import Cart from '../model/Cart.js';

export const getCartByUser = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "No se pudo obtener el carrito de compras." });
    }
};

export const addProductToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    let cart;
    try {
        cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, products: [] });
        }
    } catch (error) {
        return res.status(500).json({ message: "No se pudo obtener el carrito de compras." });
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
    } else {
        cart.products.push({ product: productId, quantity });
    }

    try {
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar el carrito de compras." });
    }
};

export const removeProductFromCart = async (req, res) => {
    const { productId } = req.params;

    let cart;
    try {
        cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "No se encontró el carrito de compras." });
        }
    } catch (error) {
        return res.status(500).json({ message: "No se pudo obtener el carrito de compras." });
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex > -1) {
        cart.products.splice(productIndex, 1);
    }

    try {
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar el carrito de compras." });
    }
};

export const clearCart = async (req, res) => {
    let cart;
    try {
        cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "No se encontró el carrito de compras." });
        }
    } catch (error) {
        return res.status(500).json({ message: "No se pudo obtener el carrito de compras." });
    }

    cart.products = [];

    try {
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar el carrito de compras." });
    }
};

// Path: src/routes/cart-routes.js