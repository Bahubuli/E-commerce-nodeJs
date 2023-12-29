const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
   name:{
    type:String
   },
   email:{
    type:String,
   },
   phone:{
    type:Number,
   },
   street:{
    type:String,
   },
   city:{
    type:String,
   },
   state:{
    type:String,
   },
   pinCode:{
    type:Number
   },
   user:{
    type:String,
   },
}
)


  // Create a model based on the filter schema
const Address =  mongoose.model('Address', addressSchema);


module.exports = Address
