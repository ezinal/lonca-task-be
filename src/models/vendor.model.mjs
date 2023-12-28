import { Schema, model } from 'mongoose';

var VendorSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
});

const Vendor = model('Vendor', VendorSchema);

export default Vendor;