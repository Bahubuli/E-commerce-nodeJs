const User = require("../model/User")
const {StatusCodes} = require("http-status-codes")
const CustomError = require("../errors")
const { createTokenUser, attachCookiesToResponse ,checkPermissions} = require("../utils/jwt")

const getAllUsers = async(req,res)=>{
   const users = await User.find({role:"user"}).select("-password")
   res.status(StatusCodes.OK).json({users})
}

const getSingleUser = async(req,res)=>{
   const user = await User.findOne({_id:req.params.id}).select("-password");
   if(!user)
   throw new CustomError.NotFoundError("No user with id "+req.params.id)

   checkPermissions(req.user,user._id);
   res.status(StatusCodes.OK).json({user})
}

const showCurrentUser = async(req,res)=>{
   res.status(StatusCodes.OK).json({user:req.user})
}

const updateUser = async(req,res)=>{

    const {name,email} = req.body;
    if(!name || !email)
    throw new CustomError.BadRequestError("please provide all the details")

    const user = await User.findOne({_id:req.user.userId})
    user.email = email
    user.name = name

   await user.save();
   const tokenUser = createTokenUser(user);
   attachCookiesToResponse({res,user:tokenUser});

   res.status(StatusCodes.OK).json({user:tokenUser})

}
const updateUserPassword = async(req,res)=>{


    const {oldPassword,newPassword} = req.body;
    if(!oldPassword || !newPassword)
    throw new CustomError.BadRequestError("please provide both passwords")

    const user = await User.findOne({_id:req.user.userId});

    const isPassswordCorrect = await user.comparePassword(oldPassword);

    if(!isPassswordCorrect)
    throw new CustomError.UnauthenticatedError("Invalid Credentials")

    user.password = newPassword

    await user.save(); // to save at any point of time

    res.status(StatusCodes.OK).json({msg:"Success!!!"})
}
module.exports = {getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword}
