
const mongoose = require('mongoose');
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


const OrderSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Please provide product name'],
            maxlength: [100, 'Name can not be more than 100 characters'],
          },
          price: {
            type: Number,
            required: [true, 'Please provide product price'],
            default: 0,
          },
          description: {
            type: String,
            required: [true, 'Please provide product description'],
            maxlength: [10000, 'Description can not be more than 10000 characters'],
          },
          category: {
            type: String,
            required: [true, 'Please provide product category'],

          },
          company: {
            type: String,
            required: [true, 'Please provide company'],
          },
          thumbnail:{
              type:String,
              required:[true,"Please provide thumbnail"]
          },
          featured: {
            type: Boolean,
            default: false,
          },
          freeShipping: {
            type: Boolean,
            default: false,
          },
          inventory: {
            type: Number,
            required: true,
            default: 15,
          },
          averageRating: {
            type: Number,
            default: 0,
          },
          discountPercentage:{
              type:Number,
          },
          numOfReviews: {
            type: Number,
            default:0
          },
          user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
          },
          paymentMethod:{
            type:String
          },
          status:{
            type:String
          },
          address:{
            type:addressSchema
          },
          quantity:{
            type:Number
          },
          email:{
            type:String
          },
          totalAmount:{
            type:Number
          }
    }
)


























//

// const SingleOrderItemSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   price: { type: Number, required: true },
//   amount: { type: Number, required: true },
//   product: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'Product',
//     required: true,
//   },
// });

// const OrderSchema = mongoose.Schema(
//   {
//     name: {
//         type: String,
//         trim: true,
//         required: [true, 'Please provide product name'],
//         maxlength: [100, 'Name can not be more than 100 characters'],
//       },
//       price: {
//         type: Number,
//         required: [true, 'Please provide product price'],
//         default: 0,
//       },
//       description: {
//         type: String,
//         required: [true, 'Please provide product description'],
//         maxlength: [10000, 'Description can not be more than 10000 characters'],
//       },
//       category: {
//         type: String,
//         required: [true, 'Please provide product category'],

//       },
//       company: {
//         type: String,
//         required: [true, 'Please provide company'],
//       },
//       thumbnail:{
//           type:String,
//           required:[true,"Please provide thumbnail"]
//       },
//       inventory: {
//         type: Number,
//         required: true,
//         default: 15,
//       },
//       averageRating: {
//         type: Number,
//         default: 0,
//       },
//       discountPercentage:{
//           type:Number,
//           required:true,
//           default:0
//       },
//       numOfReviews: {
//         type: Number,
//         default: 0,
//       },
//     shippingFee: {
//       type: Number,
//       default:50,
//     },

//     status: {
//       type: String,
//       enum: ['pending', 'dispatched', 'paid', 'delivered', 'canceled'],
//       default: 'pending',
//     },
//     user: {
//       type: mongoose.Schema.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     clientSecret: {
//       type: String,
//     },
//     paymentIntentId: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

module.exports = mongoose.model('Order', OrderSchema);
