import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/Products.js";
import products from "./data/products.js";
import Cart from "./models/Cart.js"

dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany()

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456", // will be hashed by pre-save hook
      role: "admin",
    });

    await adminUser.save();

    // Assign admin user ID to products
    const userID = adminUser._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: userID,
    }));

    // Insert products
    await Product.insertMany(sampleProducts);

    console.log("✅ Product data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
