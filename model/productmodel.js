const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
   title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: false
  },
  price:{
    type:Number,
    required:true
  },
  category:{
    type: String,
    required: true,
    enum: ["men", "women", "kids", "decor"]
  },
  images:[String],
 rating:{
    type : Number
 }
  
})

module.exports=mongoose.model("Product",productSchema)