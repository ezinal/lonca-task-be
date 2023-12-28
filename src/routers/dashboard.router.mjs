import express from 'express';
import DashboardController from '../controllers/dashboard.controller.mjs';

const router = new express.Router();

router.get('/monthlySales/:vendorId', DashboardController.getMonthlySalesData);

export default router;
