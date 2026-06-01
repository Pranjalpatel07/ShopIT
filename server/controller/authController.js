import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import userModel from "../models/userModel.js";
import {sendEmail} from "../utils/sendEmail.js"

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'30d'})
}

//Register User 

const registerUser = async (req , res) => {
    const { name, email, password } = req.body;

    try{
        const userexist = await userModel.findOne({ email });

        if(userexist){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({ name, email, password: hashedPassword });

        if(user){
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const message = `Welcome to ShopIt, ${name}. Thank you for registering with us.\nYour OTP for ShopIt registration is: ${otp}`;

            await sendEmail(email, ' OTP for Registration', message);

            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                otp: otp
            });
        }

        return res.status(400).json({ message: "Registration failed" });
    }catch(error){
        console.error('Register error:', error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Login User

const loginUser = async (req,res) => {
    const { email, password } = req.body;
    try{
        const user = await userModel.findOne({ email });
        if(user && (await bcrypt.compare(password, user.password))){
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
            
        }

        return res.status(400).json({ message: "Invalid email or password" });
    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({ message: "Server error" });
    }
}

const getUser = async (req,res) => {
    try{
        const users = await userModel.find({}).select('-password');
        res.json(users);
    }catch(error){
        res.status(500).json({message:"Server Error"})
    }
}

export { registerUser, loginUser, getUser };

