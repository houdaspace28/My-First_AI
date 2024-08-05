import axios from "axios";

export const loginUser = async (email:string,password:string)=>{
    const res= await axios.post("/user/login",{
       email,password
    });
    if(res.status !==200){
        throw new Error("Failed to login");
    }
    return res.data;
};

export const checkAuthStatus = async ()=>{
    const res= await axios.get("/user/auth-status");
    if(res.status !==200){
        throw new Error("Unable to authenticate...");
    }
    return res.data;
};

export const sendChatRequest = async (message:string)=>{
    const res= await axios.post("/chat/new",{message});
    if(res.status !==200){
        throw new Error("Unable to send chat...");
    }
    return res.data;
};