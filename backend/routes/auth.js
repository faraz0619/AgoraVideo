const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/allUsers');
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

//Register

router.post('/register', async (req, res) => {
  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({error: 'All fields are required'});
  }

  try {
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({error: 'Email is already in use'});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({username, email, password: hashedPassword});

    await newUser.save();
    res
      .status(200)
      .json({message: 'User registered successfully', user: {username, email}});
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h', 
      });
  
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id, 
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
