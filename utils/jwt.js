const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const createJWT = ({payload}) =>{
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
    return token;
}

const isTokenValid = ({token}) => jwt.verify(token,process.env.JWT_SECRET);

const attachCookiesToResponse = ({res,user}) =>{
    const token = createJWT({payload:user});

    const oneDay = 1000*60*60*24;

    res.cookie("token",token,{
       httpOnly:true,
       expires:new Date(Date.now()+oneDay),
       secure:process.env.NODE_ENV==="production",
       signed:true
    })
}

const createTokenUser = (user)=>{
    return {name:user.name,userId:user._id,role:user.role};
}

const CustomError = require("../errors")

const checkPermissions = (requestUser,resourceUserId) =>{

    if(requestUser.role==='admin') return;

    if(requestUser.userId===resourceUserId.toString()) return;

    throw new CustomError.UnauthenticatedError("Not authorized to access this route")
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createTokenUser,
    checkPermissions
}
