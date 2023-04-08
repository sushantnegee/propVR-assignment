const jwt = require("jsonwebtoken")
const User = require('../models/userModel')

const protect = async (req,res,next)=>{
    let token ;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.userId).select("-password");
            console.log("req.user",req.user);
            next();
        }catch(error){
            res.status(401);
            console.log("Not Authorized, Token Failed")
            // throw new Error("Not Authorized, Token Failed")
            return res.status(404).json({ message: 'Not Authorized, Token Failed' });
        }
    }
    
    if(!token){
        res.status(401);
        console.log("Not Authorized, No Token")
        // throw new Error("Not Authorized, No Token")
        return res.status(500).json({ message:"Not Authorized, No Token"  });
    }
}

module.exports = protect;