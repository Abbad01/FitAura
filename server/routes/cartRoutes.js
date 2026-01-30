import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Products.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

//Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  }
  if (guestId) {
    return await Cart.findOne({ guestId: guestId });
  }
  return null;
};

// @route POST /api/cart
// @desc Add product to cart for a guest or LoggedIn user
// @access Public

router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Determine if the user is loggedIn or Guest
    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // if product exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // calculate total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const savedCart = await cart.save();
      return res.status(200).json(savedCart);
    } else {
      //create new cart for guest or user
      const newCart = new Cart({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      const savedCart = await newCart.save();
      return res.status(201).json(savedCart);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// @route PUT /api/cart
// @desc Update product quantity in cart for a guest or loggedIn user
// @access Public
router.delete("/", async (req, res) => {
  const { guestId, userId, productId, size, color } = req.body;

  try {
    let cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId.toString() &&
        p.size === size &&
        p.color === color
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products.splice(productIndex, 1);

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// @route DELETE /api/cart
// @desc Clear cart for a guest or loggedIn user
// @access Public

router.delete("/", async (req, res) => {
  const { guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      //recalculate total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// @ route GET /api/cart
// @desc Get cart for a guest or LoggedIn user
//@access Public

router.get("/", async (req, res) => {
  const { guestId, userId } = req.body;
  try {
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    return res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Interval server error" });
  }
});

// @route POST /api/cart/merge
// @desc merge guest cart into user cart upon login
// @access Private

router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;
  try {
    //Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });
    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }
      if (userCart) {
        //merge carts
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );
          if (productIndex > -1) {
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {}
        return res
          .status(200)
          .json({ userCart, message: "Cart merged successfully" });
      } else {
        // if user has no existing cart, assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();

        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        //Guest cart has already been removed merged, return user cart

        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
