const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async(req,res)=>{

const hashedPassword = await bcrypt.hash(req.body.password,10);

const user = new User({
name:req.body.name,
email:req.body.email,
password:hashedPassword
});

await user.save();

res.json({message:"User Registered Successfully"});
});

router.post("/login", async(req,res)=>{

const user = await User.findOne({email:req.body.email});

if(!user){
return res.status(400).json({message:"User not found"});
}

const validPassword = await bcrypt.compare(req.body.password,user.password);

if(!validPassword){
return res.status(400).json({message:"Invalid password"});
}

const token = jwt.sign({id:user._id},"secretkey");

res.json({token});
});

module.exports = router;