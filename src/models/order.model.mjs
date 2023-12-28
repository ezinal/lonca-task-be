import { Schema, model } from 'mongoose';

var OrderSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  cart_item: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    item_count: {
      type: Number
    },
    quantity: {
      type: Number
    },
    cogs: {
      type: Number
    },
    payment_at: {
      type: Date
    }
  }],
});

const Order = model('Order', OrderSchema);

export default Order;