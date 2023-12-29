const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
        {
            productId:{
                type:mongoose.Types.ObjectId,
                required:true
            },
            name: {
              type: String,
              trim: true,
              required: [true, 'Please provide product name'],
              maxlength: [100, 'Name can not be more than 100 characters'],
            },
            quantity:{
                type:Number,
                required:true
            },
            status:{
                type:String,
                required:true
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
            images: {
              type: [String],
              default: ['/uploads/example.jpeg'],
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
                required:true,
                default:0
            },
            numOfReviews: {
              type: Number,
              default: 0,
            },
            user: {
              type: String,
            },
            totalAmount:{
                type:Number
              }
          }
  );

module.exports =  mongoose.model("Cart",cartSchema);
