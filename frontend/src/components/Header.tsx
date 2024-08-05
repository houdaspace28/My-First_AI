import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Logo from "./shared/Logo"
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{bgcolor:"transparent", position:"static", boxShadow: "none" }} >
        <Toolbar sx={{display:"flex"}}>
            <Logo />
            <div style={{display:"flex", gap:"10px"}}>
              {auth?.isLoggedIn ? (<> 
              <NavigationLink to="/chat"  textColor="white" text="Go To Chat" bg="#da9f93"/>
              <NavigationLink to="/home"  textColor="#212227" text="Logout" onClick={auth.logout} bg="#da9f93"/>
              </>) : (<>
                <NavigationLink to="/login"  textColor="#212227" text="Login" bg="#da9f93"/>
                <NavigationLink to="/signup"  textColor="#212227" text="Sign Up" bg="#da9f93"/>
              </>)}
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default Header