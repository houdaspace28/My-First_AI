import { Box , Button} from "@mui/material"
import CustomizedInput from "../components/shared/CustomizedInput"
import {toast} from 'react-hot-toast'
import { useAuth } from "../context/AuthContext";





const Login = () => {
  const auth=useAuth();
  const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try{
      toast.loading("Logging in...",{id:"login"});
      await auth?.login(email,password);
      toast.success("Logged in successfully",{id:"login"});
      toast.success("Redirecting to home page",{id:"login"});
    }catch(error){
      toast.error("Failed to login",{id:"login"});
      console.log(error);
    }
  }
  return (
    <Box width={"100%"} height={"100%"}display="flex" flex={(1)} justifyContent={"center"} alignContent={"center"} marginTop={"50px"}>
      <div style={{width:"60%", height:"50%",
        background:"#ddf0ff",
        borderRadius:"10px",border:"1px solid black",padding:"10px",display:"flex",flexDirection:"column",
      }}>
      <form style={{marginLeft:"15px",marginRight:"15px",marginBottom:"15px"}} onSubmit={(e)=>handleSubmit(e)}>
        <h1 style={{color:"black"}}>Login</h1>
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        <CustomizedInput name="email" type="email" label="Email"/>
        <CustomizedInput name="password" type="password" label="Password"/>
        <Button type="submit" sx={{padding:"2px",borderRadius:"10px",backgroundColor:"#da9f93",color:"white",":hover":{
          backgroundColor:"#c78f84"
        }}}>Login</Button>
        </div>
        
      </form>
      </div>

    </Box>
  )
}

export default Login