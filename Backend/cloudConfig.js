const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv =require("dotenv");
dotenv.config();
require('dotenv').config();
console.log("🌩️ Cloudinary ENV:", process.env.CLOUD_NAME, process.env.CLOUD_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "StayFinder",
    allowed_formats: ["jpeg", "png", "jpg", "avif"], // 👈 allow avif
  },
});

module.exports = { cloudinary, storage };
