import express from 'express';
import VendorController from "../controllers/vendor.controller.mjs";

const router = new express.Router();

router.get('/vendors/all', VendorController.findAll);

export default router;
