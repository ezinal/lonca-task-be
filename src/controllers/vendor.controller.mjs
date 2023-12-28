import Vendor from '../models/vendor.model.mjs'

function findAll(req, res, next) {
  Vendor.find().sort('name').then((vendors) => {
    return res.status(200).json({
      message: "OK",
      data: vendors
    });
  });
}

export default { findAll }