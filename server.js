const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs'); // ✅ For file handling

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
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
const newsRoutes = require('./routes/news');
const bannerRoutes = require('./routes/banners');
const companyRoutes = require('./routes/company');
const advertisementRoutes = require('./routes/advertisement');
const goldNewsRoutes = require('./routes/goldNews');
const silverRoutes = require('./routes/silver'); 
const copperRoutes = require('./routes/copper'); 
const projectNewsRoutes = require('./routes/projectNews');
const preciousMetalRoutes = require('./routes/preciousMetal');
const corporateNewsRoutes = require('./routes/corporateNews');
const worldNewsRoutes = require('./routes/worldNews');
const leadershipThoughtRoutes = require('./routes/leadershipThought');
const morningChatterRoutes = require('./routes/morningChatter');
const announcementRoutes = require('./routes/announcement');
const uploadRoute = require('./routes/upload'); // ✅ multer-based upload
const researchReportRoutes = require('./routes/researchReport');
const sponsoredRoutes = require('./routes/sponsored');


// Mount routes
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
app.use('/api/precious-metal', preciousMetalRoutes);
app.use('/api/corporate-news', corporateNewsRoutes);
app.use('/api/world-news', worldNewsRoutes);
app.use('/api/leadership-thought', leadershipThoughtRoutes);
app.use('/api/morning-chatter', morningChatterRoutes);
app.use('/api/announcement', announcementRoutes);
app.use('/api/upload', uploadRoute); // ✅
app.use('/api/research-reports', researchReportRoutes);
app.use('/api/sponsored', sponsoredRoutes);


app.get('/api/health', (req, res) => {
  res.json({ message: 'API is working fine.' });
});

// Fallback route
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    next();
  }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
