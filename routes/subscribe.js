const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

// ====== Route: Subscribe via single form entry ======
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already subscribed' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ====== Route: Bulk Upload Subscribers via CSV ======
const upload = multer({ dest: 'uploads/' });

router.post('/upload-subscribers', upload.single('csvfile'), (req, res) => {
  const subscribers = [];
  let totalRows = 0;
  let validRows = 0;

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      totalRows++;
      const name = row.Name?.trim();
      const firm = row.Firm?.trim();
      const email = row.Email?.trim().toLowerCase();

      if (email) {
        subscribers.push({ name, firm, email });
        validRows++;
      }
    })
    .on('end', async () => {
      try {
        await Subscriber.insertMany(subscribers, { ordered: false });
        fs.unlinkSync(req.file.path); // clean up the uploaded CSV
        res.status(200).json({
          message: `${validRows} subscribers added successfully out of ${totalRows} rows.`,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: `Upload completed with some errors. ${validRows} out of ${totalRows} rows processed.`,
        });
      }
    });
});

module.exports = router;
