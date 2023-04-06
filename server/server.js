const express = require("express")
const dotenv = require("dotenv");
const connectDataBase = require("./config/database");

const app = express();

dotenv.config();
app.use(express.json());

connectDataBase();
app.get("/", (req, res) => {
    res.send("API is running..");
  });   
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`listning to port  http//localhost:${PORT}`)
})