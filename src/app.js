import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user-routes.js';
import productRouter from './routes/product-routes.js';
import commentRouter from './routes/comment-routes.js';
import orderRouter from './routes/order-routes.js';
import cartRouter from './routes/cart-routes.js';

// ...

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/comment", commentRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);

mongoose
    .connect('mongodb://localhost:27017/powerpulse_sports_db')
    .then(() => app.listen(3000))
    .then(() => console.log("Conectado a MongoDB y escuchando a LocalHost:3000"))
    .catch((err) => console.log(err));
/*MongoDB-Atlas
User: admin
Password: qxy0FT5K7udMOhVs*/