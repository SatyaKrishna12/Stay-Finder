const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {v4: uuidv4} = require('uuid');
const generateToken = require('../utils/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
});



router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user);

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, 
    sameSite: 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  res.status(200).json({ message: "Login successful", user });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

router.get('/auth/status', async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password'); // avoid sending password
    if (!user) throw new Error();

    res.status(200).json({ loggedIn: true, user });
  } catch (err) {
    res.status(401).json({ loggedIn: false });
  }
});


module.exports = router;