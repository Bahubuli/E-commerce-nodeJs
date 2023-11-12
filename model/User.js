const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const validator = require("validator");
const jwt = require("jsonwebtoken")
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"please provide name"],
        minlength:3,
        maxlength:50,
    },

    email:{
        type:String,
        require:[true,"please provide email"],
      validate:{
         validator:validator.isEmail,
         message:"please provide valid email"
      },

    },

    password:{
        type:String,
        required:[true,"Please provide password"],
        minlength:6
    },

    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
})

UserSchema.pre("save",async function(next)
{
    // console.log(this.modifiedPaths());
    // console.log(this.isModified("name"));

    if(!this.isModified("password"))
     return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

UserSchema.methods.comparePassword = async function(candidatePassword)
{
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}

module.exports = mongoose.model("User",UserSchema);


// UserSchema.methods.createJWT = function()
// {
//     return jwt.sign({userId:this._id,name:this.name},"jwtSecret",
//     {expiresIn:"30d"})
// }
