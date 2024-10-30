const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

const lawyerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  password: { type: String, required: false },
  contact: { type: String, required: false },
  countryCode: { type: String, required: true, default: '+91' }, // Added to match with frontend
  location: { type: String, required: false },
  experience: { 
    type: Number, 
    required: false, 
    min: 0 
  },
  rating: { 
    type: Number, 
    min: 0, 
    max: 5 
  }, 
  role: {
    type: String,
    enum: ['user', 'lawyer', 'admin'], 
    default: 'lawyer' 
  },
  relatedLawyers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lawyer' }],
  reviews: [reviewSchema],
  licenceNumber: { type: String, required: false }, // Added for licence number
  cnicNumber: { type: String, required: false }, // Added for CNIC number
  qualificationTitle: { type: String, required: false },
  designation: { type: String, required: false },
  address: { type: String, required: false },
  address1: { type: String, required: false },
  country: { type: String, required: false }, // Added for country
  state: { type: String, required: false }, // Added for state
  speciality: { type: [String], required: false }, // Ensure compatibility with frontend
  languages: { type: [String], required: false }, // Ensure compatibility with frontend
  courts: { type: [String], required: false }, // Ensure compatibility with frontend
  note: { type: String, required: false, maxlength: 500 }, // Optional note with length validation
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true } // Automatically manages timestamps
);

// Hash password before saving
lawyerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
lawyerSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Lawyer = mongoose.model('Lawyer', lawyerSchema);
module.exports = Lawyer;
