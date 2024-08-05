import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext.tsx'
import axios from 'axios'
import {Toaster} from "react-hot-toast";


axios.defaults.baseURL="http://localhost:5005/api/v1";
axios.defaults.withCredentials=true;
const theme = createTheme({
  typography:{
    fontFamily: "Montserrat",
    allVariants:{
      color:"#212227"
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position='top-right'/>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
