import express from "express";
import Checkout from "../models/Checkout.js";
import Product from "../models/Products.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private

router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout cart" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    });

    res.status(201).json(newCheckout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private

router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = "paid";
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();
      return res.status(200).json(checkout);
    }

    res.status(400).json({ message: "Invalid payment status" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private

router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (!checkout.isPaid) {
      return res.status(400).json({ message: "Checkout not paid" });
    }

    if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized" });
    }

    const finalOrder = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      isDelivered: false,
      paymentStatus: "paid",
      paymentDetails:checkout.paymentDetails,
    });

    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    await Cart.findOneAndDelete({ user: checkout.user });

    res.status(201).json(finalOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



export default router