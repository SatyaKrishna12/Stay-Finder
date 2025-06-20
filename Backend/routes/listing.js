const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const wrapAsync = require('../utils/wrapAsync');
const mongoose = require('mongoose');
const multer = require("multer");
const { storage } = require('../cloudConfig');
const authenticate = require('../middleware/authenticate');
const upload = multer({ storage});

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allList = await Listing.find({});
    res.json(allList);
  })
);

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let mylist = await Listing.findById(id).populate("reviews");
    res.json(mylist);
  })
);

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, location, country, host } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    let url = req.file.path;
    let filename = req.file.filename;
    if (!title || !description || !price || !location || !country || !host) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newListing = new Listing({
      title,
      description,
      price,
      location,
      country,
      host,
      image: {
        url: url,
        filename: filename,
      },
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
res.status(500).json({ message: err.message || "Something went wrong" });

  }
});

router.delete('/:id',authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this listing" });
    }

    await Listing.findByIdAndDelete(id);
    res.status(200).json({ message: "Listing deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;