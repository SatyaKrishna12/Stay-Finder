const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Listing = require('../models/Listing');
const Review = require('../models/Review');

router.get('/listing/:id', async (req, res) => {
  try {
    const reviews = await Review.find({ listing: req.params.id }).populate('user');
    
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = reviews.length ? (total / reviews.length).toFixed(1) : 0;

    res.status(200).json({ reviews, averageRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

router.post('/:listingId', async (req, res) => {
  const { rating, comment, user } = req.body;
  const { listingId } = req.params;

  const review = new Review({ rating, comment, user, listing: listingId });
  console.log(review);
  await review.save();

  const listing = await Listing.findById(listingId);
  console.log(listing);
  listing.reviews.push(review._id);
  await listing.save();
  res.status(201).json({ message: "Review added", review });
});

router.get('/user/:userId', async (req, res) => {
  const reviews = await Review.find({ user: req.params.userId }).populate('listing');
  res.json(reviews);
});

module.exports = router;