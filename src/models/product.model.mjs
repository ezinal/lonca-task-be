import { Schema, model } from 'mongoose';

var ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor'
  },
});

const Product = model('Product', ProductSchema);

export default Product;