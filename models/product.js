// models/Product.js
import mongoose,{ Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category:{type:mongoose.Types.ObjectId,ref:'Category'}

});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
