const express = require("express")
const dotenv = require("dotenv");
const connectDataBase = require("./config/database");
const cors = require('cors')
const userRoutes= require("./routes/userRoutes")

const app = express();
app.use(cors())

dotenv.config();
app.use(express.json());

app.use('/user',userRoutes);

connectDataBase();
app.get("/", (req, res) => {
    res.send("API is running..");
  });   
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`listning to port  http//localhost:${PORT}`)
})