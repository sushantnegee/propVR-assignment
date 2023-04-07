const express = require("express")
const dotenv = require("dotenv");
const connectDataBase = require("./config/database");
const cors = require('cors')
const userRoutes= require("./routes/userRoutes")
const projectRoutes= require("./routes/projectRoutes")

const app = express();
app.use(cors())

dotenv.config();
app.use(express.json());

app.use('/user',userRoutes);
app.use('/projects',projectRoutes);

connectDataBase();
app.get("/", (req, res) => {
    res.send("API is running..");
  });   
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`listning to port  http//localhost:${PORT}`)
})