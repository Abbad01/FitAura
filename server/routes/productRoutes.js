import express from "express";
import Product from "../models/Products.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//@route POST /api/products
//@desc Create new Product in database
//@access Private

router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, //reference to admin who created the product, from auth middleware the request context has user object
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/products/best-seller
// @desc Retrieve the product with hghest rating
// @access Public

router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No best seller found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/products/new-arrivals
// @desc Retrieve the latest added products
// @access Public

router.get("/new-arrivals", async (req, res) => {
  try {
    // Fetch latest 8 products based on creation date
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/products
// @desc Get all products with optional query filters
// @access Public

router.get("/", async (req, res) => {
  try {
    const {
      collection,
      category,
      minPrice,
      maxPrice,
      size,
      color,
      gender,
      search,
      sortBy,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    if (collection && collection.toLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (color) {
      query.colors = { $in: [color] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // SORT LOGIC
    let sort = {};
    switch (sortBy) {
      case "price-low":
        sort = { price: 1 };
        break;
      case "price-high":
        sort = { price: -1 };
        break;
      case "rating":
        sort = { rating: -1 };
        break;
      case "latest":
      default:
        sort = { createdAt: -1 };
        break;
    }

    const limitValue = limit ? Number(limit) : 0;

    const products = await Product.find(query).sort(sort).limit(limitValue);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/products/:id
// @desc update and existing product by id
// @access Private/ admin

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured = isFeatured ?? product.isFeatured;
      product.isPublished = isPublished ?? product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/produts/id
// @desc Delete a product by ID
// @access Private/Admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    //Find product using id from params
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/products/similar/:id
// @desc Get similar products based on the current product's gender and category,
// @access Public

router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    const similarProducts = await Product.find({
      _id: { $ne: product._id },
      gender: product.gender,
      category: product.category,
    }).limit(4);
    res.json(similarProducts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
