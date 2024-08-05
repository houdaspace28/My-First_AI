import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (id:string, email:string, expiresIn) => {
   const payload = {id,email};
   const token=jwt.sign(payload,process.env.JWT_SECRET, {expiresIn});
   return token;
};
export const verifyToken = async (req:Request, res:Response, next:NextFunction)=>{
 const token= req.signedCookies[`auth-token`];
 if(!token || token.trim() === ""){
    return res.status(401).json({message:"No received token"});
 }
 return new Promise<void>((resolve,reject)=>{
    return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
        if(err){
         reject(err);
         return res.status(401).json({message:"Token expired"});
        }else{
         console.log("Token verified")
         resolve();
         res.locals.jwtData = success;
         return next();
        }
        
    });
 });
}