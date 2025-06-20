const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');


function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

router.post(
  '/',
  async (req, res) => {
    try {
      const { listing,user, startDate, endDate, guests, totalPrice } = req.body;
        const newBooking = new Booking({
          user,
        listing,
        startDate,
        endDate,
        guests,
        totalPrice
      });
        await newBooking.save();    
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {   
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    }
);

router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.find({"user" : req.params.id}).populate('listing user'); 
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);

  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.delete('/:bookingId', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this booking' });
    }

    await Booking.findByIdAndDelete(req.params.bookingId);
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('listing')
      .populate('user', 'username'); 

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;