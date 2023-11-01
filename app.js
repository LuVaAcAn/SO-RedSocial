import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
const app = express();

app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog", blogRouter);
mongoose
    .connect('mongodb+srv://admin:qxy0FT5K7udMOhVs@cluster0.hjmcvax.mongodb.net/SO-SocialMedia?retryWrites=true&w=majority'
        ).then(()=>app.listen(5000)
        ).then(()=>console.log("Conectado a MongoDB y escuchando a LocalHost:5000")
        ).catch((err)=>console.log(err));

/*MongoDB-Atlas
User: admin
Password: qxy0FT5K7udMOhVs*/