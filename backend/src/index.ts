import app from "./app.js";
import {connectToDatabase} from "./db/connection.js";

const PORT = process.env.PORT || 5005;

connectToDatabase()
 .then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);});
    })
 .catch((error)=>{
  console.log(error);
})


