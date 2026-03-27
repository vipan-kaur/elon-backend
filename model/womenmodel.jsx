const mongoose=require("mongoose")
const womenSchema=new mongoose.Schema({
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
    enum:[women]
  },
  images:[String],
 rating:{
    type : Number
 }
  
})

module.exports=mongoose.model("Womenproduct",womenSchema)