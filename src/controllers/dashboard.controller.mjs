import Product from '../models/product.model.mjs'
import handleServerError from '../utils/errorUtils.mjs'
import Vendor from "../models/vendor.model.mjs";
import {ObjectId} from "mongodb";
import Order from "../models/order.model.mjs";

async function getMonthlySalesData(req, res, next) {
  const vendorId = req.params.vendorId
  const vendor = await Vendor.findById(vendorId)
  if (!vendor) {
    return res.status(400).json({ message: 'Vendor is not found', data: null })
  }
  const vendorProductIds = await Product.find({ vendor: ObjectId(vendorId) }).map(product => product._id)
  const monthlyProducts = await Order.aggregate([
    { $match: {'cart_item.product':{$in: vendorProductIds}} },
    { $group: {
        _id: {$month: '$payment_at'},
        salesCount: {
          $sum: 1
        }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ])
  return res.status(200).json({ message: 'OK', data: monthlyProducts })
}

export default { getMonthlySalesData }