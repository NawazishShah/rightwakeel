const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema for registration and profile
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date }, // Date of birth
  ccNumber: { type: String }, // Credit card number (assuming string for flexibility)
  cnicNumber: { type: String }, // National ID number
  contact: { type: String }, // Contact number
  designation: { type: String }, // User designation
  qualificationTitle: { type: String }, // Qualification title
  address: { type: String }, // Primary address
  address1: { type: String }, // Secondary address (optional)
  country: { type: String }, // Country
  state: { type: String }, // State
  note: { type: String }, // Additional notes
  role: {
    type: String,
    enum: ['user', 'lawyer', 'admin'], // Add roles
    default: 'user' // Default to user
  },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is new or modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
