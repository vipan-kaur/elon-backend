const productmodel = require("../model/productmodel");
const Product=require("../model/productmodel")


const createProduct=async(req,res)=>{
    try{
    const{title,description,price,category}=req.body;
        const images=req.files.map(file=>file.filename)
        
   const existingProduct = await Product.findOne({
      title,
      description,
      price,
    });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }
     const newproduct =new Product({title,description,price,category,images})
         await newproduct.save();
        
        return res.status(200).json({message:"product is created in", category , newproduct})
          }catch(error){
    
 return res.status(500).json({message:error.message})}
}


const deleteProduct =async(req,res)=>{
const {id}=req.params;
   const deletedProduct = await Product.findByIdAndDelete(id)
   if(!deletedProduct){
   return res.status(400).json({message:"not found"})
   }
 return  res.status(200).json({message:"product deleted"})
  
  
}

const updateProduct=async(req,res)=>{
  const {id}=req.params;
  const updatedProduct=await Product.findByIdAndUpdate(
    id,
    req.body,
    {new:true,runValidators: true }
  )
if(!updatedProduct){
 return res.status(400).json({message:"product not found"})
}
return res.status(200).json({message:"product updated",updatedProduct})
} 

const updateImage=async(rrq,res)=>{
  try{
  const {id}=req.params;
  const newimg= Product.findByIdAndUpdate(id,
    {image:req.file.filename},
    {new:true}
  )
 
   if(!newimg){
      return res.status(404).json({message:"not found"})
    }
    res.status(201).json({message:"updated",user})
  }catch(error){
    res.status(500).json({message:error.message})
  }
 await newimg.save();
}
const getProductById =async(req,res) => {
  try{
    const{id}=req.params;
    const product=await Product.findById(id)
    if(!product){
      return res.status(201).json({message:"product not found"})
    }
  return res.status(200).json({message:"product",product})
  }catch{
    return res.status(500).json({message:err.message})
  }
}
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category });

  return  res.status(200).json(products);

  } catch (error) {
 return   res.status(500).json({ message: error.message });
  }
};

const getallMenImg=async(req,res)=>{
  const {id}=useParams;
  const AllImg=await Product.find({category})
  if(category==men){
    return res.status(200).json({message:"images are fetchd successfully from men section",AllImg})
  }
  return res.status(404).json({message:"image not found"})
}
const getallProducts =async(req,res)=>{
  const AllProduct=await Product.find()
  if(AllProduct.length===0){
   return res.status(404).json({message:"Not Found"})
  }
  return res.status(200).json({
    message:"Data fetched Successfully",
    product: AllProduct})

}


module.exports={createProduct,updateProduct,deleteProduct,getProductsByCategory,getallProducts,getProductById,getallMenImg}