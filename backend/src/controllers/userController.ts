import userModel from "../models/user.js";
import {NextFunction, Request , Response} from "express";
import {hash, compare} from "bcrypt"
import { generateToken } from "../utils/tokenManager.js";


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await userModel.find();
        return res.status(200).json({message: "All users fetched successfully", users});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error", cause: error.message});
    }
    
    
}

export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
       const  {nom , email , password} = req.body;
       const existingUser = await userModel.findOne({email});
       if(existingUser){
        return res.status(409).json({message: "User already exists"});
       }
       const hashedPassword = await hash(password, 10);     
       const user = new userModel({nom , email , password: hashedPassword});
       await user.save();
        res.clearCookie("auth_token",{
        httpOnly:true,
        domain: "localhost",
        signed:true,
        path: "/"
        });
       const token = generateToken(user.id, user.email, "7d");
       const expires= new Date();
       expires.setDate(expires.getDate()+7);
       res.cookie("auth_token",token, {path: "/", domain: "localhost", expires, httpOnly: true,signed:true});
       return res.status(201).json({message: "User created successfully", name:user.nom, email:user.email});
    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Internal server error", cause: error.message});
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) =>{
try{
    const {email,password}=req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(401).json({message: "No registered account with this email"});
    }
    const passwordValid = await compare(password,user.password);
    if(!passwordValid)
        return res.status(403).json({message:"Incorrect password"});

    res.clearCookie("auth_token",{
        httpOnly:true,
        domain: "localhost",
        signed:true,
        path: "/"
    });

    const token = generateToken(user.id, user.email, "7d");
    const expires= new Date();
    expires.setDate(expires.getDate()+7);
    res.cookie("auth_token",token, {path: "/", domain: "localhost", expires, httpOnly: true,signed:true});
    return res.status(200).json({message:"Login successful", name:user.nom, email:user.email});
    
}catch(error){
   console.log(error);
   return res.status(500).json({message: "Internal server error", cause: error.message});
}
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        
        const user = await userModel.findOne({email: res.locals.jwtData.email});
        if(!user){
            return res.status(401).json({message: "No registered account with this email or token malfunction"});
        }
        if(user.id.toString() !== res.locals.jwtData.id){
            return res.status(401).json({message: "Token malfunction"});
        }
        return res.status(200).json({message:"Login successful", name:user.nom, email:user.email});
        
       }catch(error){
       console.log(error);
       return res.status(500).json({message: "Internal server error", cause: error.message});
    }
    };



 
