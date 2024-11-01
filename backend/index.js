  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const lawyers = require('./routes/lawyers');
  const auth = require('./routes/auth');
  const path = require('path');
  require('dotenv').config();

  const app = express();
  const PORT = process.env.PORT || 5000;
  
  
  // Database connection
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

  const jwtSecret = process.env.JWT_SECRET_KEY 

  const allowedOrigins = [
    'https://www.rightwakeel.com',
    'https://rightwakeel-h1f3ioa94-alis-projects-70a04678.vercel.app'
  ];
  
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow cookies if needed
    }
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200); // Send OK status for preflight requests
    }
    next();
  });
  

  
  // Middleware
  app.use(express.json());
  
  // CORS configuration
  // app.use(cors({
  //   origin: 'https://www.rightwakeel.com', // Allow requests only from your frontend
  //   credentials: true // Enable cookies/sessions if needed
  // }));
  
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  // API Routes


app.use('/api/account', auth);
app.use('/api/lawyers', lawyers);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
