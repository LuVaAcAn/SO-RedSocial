// controllers/order-controller.js
import Order from '../model/Order.js';

export const createOrder = async (req, res) => {
    const { products, total } = req.body;
    const newOrder = new Order({
        user: req.user._id,
        products,
        total,
    });

    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "No se pudo crear el pedido." });
    }
};

export const getOrdersByUser = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "No se pudieron obtener los pedidos." });
    }
};