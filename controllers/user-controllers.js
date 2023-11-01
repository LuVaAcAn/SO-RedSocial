import User from "../model/User.js";
import bcrypt from 'bcryptjs';

export const getAllUsers = async(req, res, next) => {
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }

    if(!users){
        return res.status(404).json({message: "No se han encontrado usuarios."});
    }

    return res.status(200).json({users});
}

export const signup = async(req, res, next) => {
    const {name,email,password} =  req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"Usuario existente. Inicie sesión."});
    }
        const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[],
    });

    try{
        await user.save();
    }catch(err){
        console.log(err);
    }

    return res.status(201).json({user});
}

export const login = async(req, res, next) => {
    const { email, password } = req.body;
    let existingUser;

    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    
    if(!existingUser){
        return res
            .status(404)
            .json({message: "¡No se pudo encontrar a un usuario con este email!"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "¡Contraseña Incorrecta!"});
    }

    return res.status(200).json({message: "¡Inicio de sesión correcto!"});
}