const User=require("../model/usermodel")
const bcrypt =require("bcrypt")
const nodemailer=require("nodemailer")
const generateOtp=()=>{
  return  Math.floor(Math.random()*9000)+1000
}

const transport=nodemailer.createTransport({
     host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"vihnikaur@gmail.com",
        pass:"vytn jsni ekho gjwj"
  }

})

const signup=async(req,res)=>{

    const{name,email,password,confirmPassword}=req.body
    const existuser=await User.findOne({
        email:email
    })
    if(existuser){
       return res.status(400).json({message:"this email is already registed"})
    }
      if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
    const hashPassword=await bcrypt.hash(password,10)
    const newUser= new User({
        name,email,password:hashPassword
    })
    await newUser.save();
    return res.status(201).send({message:"user created"})
}


const login=async(req,res)=>{
    try{
    const{email,password}=req.body
    const user=await User.findOne({
        email:email
    })
    if(!user){
        return res.status(404).json({message:"user not found, please signup"})
    }
    const comparePass= await bcrypt.compare(password,user.password)
    if(!comparePass){
        return res.status(400).json({message:"password incorrect"})
    }

    const otp =generateOtp()
    user.otp=otp
    await user.save()

    const mailoption = {
  from: "vihnikaur@gmail.com",
  to: user.email,
  subject: " OTP Verification",
  text: `Hello ${user.name} Your One-Time Password (OTP) for verification is: ${otp}

`}
  await transport.sendMail(mailoption);

      res.status(200).json({message:"Otp sent"})
      }catch(error){
      res.status(500).json({message:error.message})
             }
}
module.exports={signup,login}