const Product = require("../model/Product");
const {StatusCodes} = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path")

const createProduct = async (req,res)=>{
    req.body.user = req.user.userId;
    const product =await Product.create(req.body);
    res.status(StatusCodes.CREATED).send(product)
}

const getAllProducts = async (req,res)=>{
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({products,count:products.length});
}

const getSinglProduct = async (req,res)=>{
    const {id:productId} = req.params;
    const product = await Product.findOne({_id:productId}).populate("reviews")

    if(!product)
    throw new CustomError.NotFoundError("No product with id : "+productId)

    res.status(StatusCodes.OK).json({product})
}

const updateProduct = async (req,res)=>{
   const {id:productId} = req.params;
   const product = await Product.findOneAndUpdate({_id:productId},req.body,{new:true,runValidators:true})

   if(!product)
   throw new CustomError.NotFoundError("No product with id: "+productId);

   res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async (req,res)=>{
    const {id:productId} = req.params;
    const product = await Product.findOne({_id:productId});

    await product.remove();
    res.status(StatusCodes.OK).json({msg:"product is deleted"})
}

const uploadImage = async (req,res)=>{
    if(!req.files)
    throw new CustomError.BadRequestError("No file uploaded")

    const productImage = req.files.Image;

    if(!productImage.mimetype.startsWith("image"))
    throw new CustomError.BadRequestError("please upload image ")

    const maxSize = 1024*1024*10;
    if(productImage.size>maxSize)
    throw new CustomError.BadRequestError("file size should be smaller")

    const imagePath = path.join(__dirname,"../public/uploads/"+`${productImage.name}`)
    console.log(imagePath)
    await productImage.mv(imagePath);

    res.status(StatusCodes.OK).json({image:`/uploads/${productImage.name}`})
}

module.exports = {createProduct,getAllProducts,getSinglProduct,updateProduct,deleteProduct,uploadImage}
