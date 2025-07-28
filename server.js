const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload'); // ✅ For file uploads

dotenv.config();

const app = express();

// 📦 Middleware: parse JSON and form data with increased size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(fileUpload()); // ✅ Middleware to handle file uploads

// 📁 Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🔗 MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is working fine.' });
});

// 🔌 API Routes
const subscribeRoute = require('./routes/subscribe');
const authRoute = require('./routes/auth');
const flipbookRoute = require('./routes/flipbook');
const adminRoute = require('./routes/admin');
const newsRoutes = require('./routes/news');
const bannerRoutes = require('./routes/banners');
const companyRoutes = require('./routes/company');
const advertisementRoutes = require('./routes/advertisement');
const goldNewsRoutes = require('./routes/goldNews');
const silverRoutes = require('./routes/silver'); 
const copperRoutes = require('./routes/copper'); 
const projectNewsRoutes = require('./routes/projectNews');



// 🧭 Mount routes
app.use('/api/subscribe', subscribeRoute);
app.use('/api/auth', authRoute);
app.use('/api/flipbooks', flipbookRoute);
app.use('/api/admin', adminRoute);
app.use('/api/news', newsRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/ads', advertisementRoutes);
app.use('/api/gold-news', goldNewsRoutes);
app.use('/api/silver-news', silverRoutes); 
app.use('/api/copper-news', copperRoutes); 
app.use('/api', projectNewsRoutes);


// 🔁 Fallback: Serve index.html for non-API GET routes (SPA behavior)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    next();
  }
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
