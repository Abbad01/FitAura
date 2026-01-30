import "dotenv/config";
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload route
router.post(
  "/",
  upload.single("image"), // ✅ CORRECT
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Stream upload helper
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" }, // optional
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req.file.buffer);

      return res.status(200).json({
        imageUrl: result.secure_url,
        publicId: result.public_id,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

export default router;
