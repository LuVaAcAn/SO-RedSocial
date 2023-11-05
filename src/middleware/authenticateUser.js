import jwt from 'jsonwebtoken';
import User from '../model/User.js';

export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "No se proporcionó un token de autenticación." });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "El token de autenticación es inválido." });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al autenticar al usuario: " + err.message });
    }
};