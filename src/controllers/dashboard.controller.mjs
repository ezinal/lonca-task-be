import Product from '../models/product.model.mjs'
import Vendor from "../models/vendor.model.mjs";
import {ObjectId} from "mongodb";
import Order from "../models/order.model.mjs";
import errorUtils from "../utils/responseUtils.mjs";

const {handleSuccessfulResponse, handleInvalidRequestError, handleServerError} = errorUtils

async function getMonthlySalesData(req, res, next) {
  try {
    const vendorId = req.params.vendorId
    if (!vendorId) {
      handleInvalidRequestError(res)
    }
    const vendor = await Vendor.findById(vendorId)
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor is not found', data: null })
    }
    const vendorProductIds = await Product.find({ vendor: new ObjectId(vendorId) }).then(products => products.map(product => product._id))
    const monthlyProducts = await Order.aggregate([
      { $match: {'cart_item.product':{$in: vendorProductIds}} },
      { $set: { payment_date: { $concat: [{$toString: {$year: '$payment_at'}}, "-" ,{$toString: {$month: '$payment_at'}}] }} },
      { $group: {
          _id: '$payment_date',
          salesCount: {
            $sum: 1
          }
        }
      },
      { $set: { date: '$_id' }},
      { $unset: '_id' }
    ])
    handleSuccessfulResponse(res, monthlyProducts)
  } catch (e) {
    handleServerError(e, res)
  }
}

async function getProductSalesReport(req, res, next) {
  try {
    const vendorId = req.params.vendorId
    if (!vendorId) {
      handleInvalidRequestError(res)
    }
    const vendor = await Vendor.findById(vendorId)
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor is not found', data: null })
    }
    const vendorProducts = await Product.find({ vendor: new ObjectId(vendorId) }).then(value => value)
    const productsMap = {}
    for (const product of vendorProducts) {
      productsMap[product._id] = product.name
    }
    const vendorProductIds = vendorProducts.map(product => product._id)
    const productSaleCounts = await Order.aggregate([
      { $unwind: { path: '$cart_item', preserveNullAndEmptyArrays: false } },
      { $match: {'cart_item.product':{$in: vendorProductIds}} },
      { $group: {
          _id: '$cart_item.product',
          salesCount: {
            $sum: 1
          }
        }
      },
      { $set: { productId: '$_id' }},
      { $unset: '_id' }
    ]).then(value => value)
    productSaleCounts.forEach(product => product.name = productsMap[product.productId])
    handleSuccessfulResponse(res, productSaleCounts)
  } catch (e) {
    handleServerError(e, res)
  }
}

export default { getMonthlySalesData, getProductSalesReport }