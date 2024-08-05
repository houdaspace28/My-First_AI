import {Box, Avatar, Typography, Button, IconButton} from "@mui/material";
import { useAuth } from "../context/AuthContext"
import {IoMdSend} from "react-icons/io"
import { useRef, useState } from "react";
import { sendChatRequest } from "../helpers/api-communicator";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {coldarkCold} from 'react-syntax-highlighter/dist/esm/styles/prism'

function extractCodeBlock(message:string){
  if(message.includes("```")){
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str:string){
  if(str.includes("=") ||str.includes(";") || str.includes("{") || str.includes("}") || str.includes("]") || str.includes("[") || str.includes("#") || str.includes("//") || str.includes("/*") || str.includes("*/") ){
  return true;
}
return false;
}
type Message = {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const inputRef=useRef<HTMLInputElement>(null);
  const auth=useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const content = inputRef.current?.value as string;
  const messageBlocks = extractCodeBlock(content);
  const handleSubmit = async () =>{
  if(inputRef && inputRef.current){
    inputRef.current.value="";
  }
  const newMessage : Message = {role:"user",content};
  setChatMessages((prev) => [...prev,newMessage]);
  const chatData = await sendChatRequest(content);
  setChatMessages([...chatData.chats]);
  };
  return (
    <Box sx={{display:'flex',flex:1,width:'100%',height:'100%',mt:3,gap:3}}>
    <Box sx={{display:{md:"flex",xs:"none",sm:"none"},flex:0.2,flexDirection:"column"}}>
      <Box sx={{display:'flex',width:"100%",height:"60vh",borderRadius:"5px",flexDirection:"column",mx:"3px",border:"1px solid black",margin:3}}>
      <Avatar sx={{mx:"auto",my:"2px",bgcolor:"white",color:"black",fontWeight:700}}>{auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}</Avatar>
      <Typography sx={{mx:"auto",fontFamily:"work sans"}}>You are talking to a Chatbot</Typography>
      <Typography sx={{mx:"auto",fontFamily:"work sans",my:4,p:3}}>Ask me anything but avoid sharing personal information</Typography>
      <Button sx={{width:'200px',my:"auto",color:"white",fontWieght:700,borderRadius:3,mx:"auto",bgcolor:"#da9f93",":hover":{bgcolor:"#c78f84"}}}>Clear Conversation</Button>
      </Box>

    </Box>
    <Box sx={{display:"flex",flex:{md:0.8,xs:1,sm:1},flexDirection:"column",px:3}}>
    <Typography sx={{textAlign:"center",fontSize:"40px",color:"black",mb:2,mx:"auto"}}>
      Model - GPT 3.5 Turbo
    </Typography>
    <Box sx={{width:"100%",height:"60vh",borderRadius:3,mx:"auto",display:"flex",flexDirection:"column",overflow:"scroll",overflowX:"hidden",scrollBehavior:"smooth",overflowY:"auto"}}>
    {chatMessages.map((message, index) => (
      <Box key={index} sx={{display:"flex",flexDirection:message.role === "user" ? "row" : "row-reverse",border:"1px solid black",borderRadius:3,p:2,marginY:2}}>
        <Avatar sx={{bgcolor:"white",color:"black",fontWeight:700}}>{message.role[0]}</Avatar>
        <Box>
          {!messageBlocks && (<Typography sx={{fontSize: "20px"}}>{content}</Typography>)}
          {messageBlocks && messageBlocks.length > 0 && messageBlocks.map((block) => (
            isCodeBlock(block) ? (
              <SyntaxHighlighter language="python" style={coldarkCold}>{block}</SyntaxHighlighter>
            ) : (
              <Typography sx={{fontSize: "20px"}}>{block}</Typography>
            )
          ))}
        </Box>
      </Box>
    ))}
    </Box>
    <div style={{width:"100%",padding:"20px",borderRadius:8,backgroundColor:"#ffff",display:"flex",marginRight:"auto"}}>
    <input type="text" style={{width:"100%",border:"none",margin:3, outline:"none",backgroundColor:"transparent",padding:"10px",color:"black",fontSize:"18px"}} ref={inputRef}/>
    <IconButton onClick={handleSubmit} style={{marginLeft:"auto",color:"black"}}>
    <IoMdSend/>
    </IconButton>
    </div>
    </Box>
    </Box>
  )
}

export default Chat