const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is working fine.' });
});

// Routes
const subscribeRoute = require('./routes/subscribe');
const authRoute = require('./routes/auth');
const flipbookRoute = require('./routes/flipbook');
const adminRoute = require('./routes/admin'); // ✅ add this


// Mount all API routes
app.use('/api/subscribe', subscribeRoute);
app.use('/api/auth', authRoute);
app.use('/api/flipbooks', flipbookRoute); // ✅ Note: changed from /flipbook to /flipbooks
app.use('/api/admin', adminRoute);            // ✅ add this


// Serve index.html for all other non-API GET routes
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    next();
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
