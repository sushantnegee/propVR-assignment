const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password,image } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User Already Exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    image,
    password: hashedPassword,
    
  });

  if (newUser) {
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
      token: token,
    });
  } else {
    throw new Error("Failed to Create account");
  }
};

const authUser = async(req,res)=>{
const {email,password}  = req.body;
try {
    const user = await User.findOne({email});
    if(!user){
        res.status(401)
        throw new Error('Invalid email or passswords')
    }

    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword){
        return res.status(400)
        .json({message:'Invalid Credentials'})
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      // console.log(token) 
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        image:user.image,
        token: token, 
      });

} catch (error) {
    res.status(500).json({ message: error.message });
}

}

module.exports = { registerUser, authUser };
