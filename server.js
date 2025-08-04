const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');

dotenv.config();

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors()); // Optional: Use only if calling APIs from another domain
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const subscribeRoute = require('./routes/subscribe');
const authRoute = require('./routes/auth');
const flipbookRoute = require('./routes/flipbook');
const adminRoute = require('./routes/admin');
const bannerRoutes = require('./routes/banners');
const companyRoutes = require('./routes/company');
const advertisementRoutes = require('./routes/advertisement');
const copperRoutes = require('./routes/copper');
const uploadRoute = require('./routes/upload');
const taggedPostRoutes = require('./routes/taggedPosts');

// Mount API routes
app.use('/api/subscribe', subscribeRoute);
app.use('/api/auth', authRoute);
app.use('/api/flipbooks', flipbookRoute);
app.use('/api/admin', adminRoute);
app.use('/api/banners', bannerRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/ads', advertisementRoutes);
app.use('/api/copper-news', copperRoutes);
app.use('/api/upload', uploadRoute);
app.use('/api/tagged-posts', taggedPostRoutes);

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is working fine.' });
});

// Serve upload-subscribers.html directly
app.get('/admin/upload-subscribers', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'upload-subscribers.html'));
});

// Catch-all for frontend routes
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    next();
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
