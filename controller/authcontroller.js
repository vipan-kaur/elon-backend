const User = require("../model/usermodel")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const generateOtp = () => {
  return Math.floor(Math.random() * 9000) + 1000
}

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "youremaail@@gmail.com",
    pass: "apasssss"
  }

})

// const signup=async(req,res)=>{

//     const{name,email,password,confirmPassword}=req.body
//     const existuser=await User.findOne({
//         email:email
//     })
//     if(existuser){
//        return res.status(400).json({message:"this email is already registed"})
//     }
//   //     if (password !== confirmPassword) {
//   //   return res.status(400).json({ message: "Passwords do not match" });
//   // }
//    const hashPassword=await bcrypt.hash(password,10)
//   const compare=await bcrypt.compare(password,confirmPassword)

//     const newUser= new User({
//         name,email,password:hashPassword
//     })
//     await newUser.save();
//     return res.status(201).send({message:"user created",newUser} )
// }

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const existuser = await User.findOne({ email });

    if (existuser) {
      return res.status(400).json({ message: "This email is already registered" });
    }


    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created",
      newUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      email: email
    })
    if (!user) {
      return res.status(404).json({ message: "user not found, please signup" })
    }
    const comparePass = await bcrypt.compare(password, user.password)
    if (!comparePass) {
      return res.status(400).json({ message: "password incorrect" })
    }

    const otp = generateOtp()
    user.otp = otp
    await user.save()

    const mailoption = {
      from: "vihnikaur@gmail.com",
      to: user.email,
      subject: " OTP Verification",
      text: `Hello ${user.name}, Your OTP is: ${otp}`

    }
    await transport.sendMail(mailoption);

    res.status(200).json(
      { message: "Otp sent" }

    )
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// const verify=async(req,res)=>{
//   try{
//     const{email,otp}=req.body
//     const user= await User.find({email})
//     if(!user){
//       res.status(404).json({message:"user not found"})
//     }
//     if(user.otp==otp){
//   user.otp=null;
//  await user.save()


//  const token =jwt.sign(
//   {id:user._id ,email:user.email},
//   process.env.JWT_SECRET,
//   {expiresIn:"1d"}
//  );

//  return res.status(201).json({message:"login sucsessfully",
//   token:token,
//   user:{
//         _id:user._id,
//         email:user.email,
//         name:user.name
//   }}
//  )
//     }else{
//       return res.status(400).json({message:"incorrect otp"})
//     }
//   }catch(err){
//     return res.status(500).json({message:err.message})
//   }}


const verify = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (user.otp && user.otp.toString() === otp.toString()) {
      user.otp = null;
      await user.save();

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "login successfully",
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name
        }
      });
    } else {
      return res.status(400).json({ message: "incorrect otp" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login, verify, getUserbyId };