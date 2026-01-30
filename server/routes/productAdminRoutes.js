import express from "express";
import Product from "../models/Products.js";
import { protect, admin } from "../middleware/authMiddleware.js";


const router=express.Router()
// @route GET /api/admin/products
// @desc Get all products (Admin Only)
// @Access Private/admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router
