const express=require("express")
const router=express.Router()
const{ signup,login,verify,getUserbyId}=require("../controller/authcontroller")

router.post("/signup",signup)
router.post("/login",login)
router.post("/verify",verify)
router.get("/profile/:id", getUserbyId)

module.exports=router