// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Lawyer = require('../models/Lawyer');
const Admin = require('../models/Admin');
require('dotenv').config();

const register = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  try {
    let user;
    if (role === 'lawyer') {
      user = await Lawyer.findOne({ email });
      if (user) return res.status(400).json({ msg: 'Lawyer already exists' });
      user = new Lawyer({ firstname, lastname, email, password, role: 'lawyer' });
    } else if (role === 'admin') {
      user = await Admin.findOne({ email });
      if (user) return res.status(400).json({ msg: 'Admin already exists' });
      user = new Admin({ firstname, lastname, email, password, role: 'admin' });
    } else {
      user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'User already exists' });
      user = new User({ firstname, lastname, email, password, role: 'user' });
    }

    await user.save();
    res.status(201).json({ msg: `${role} registered successfully` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    if (role === 'lawyer') {
      user = await Lawyer.findOne({ email });
    } else if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, msg: `${role} login successful` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, login };
