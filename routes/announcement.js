const express = require('express');
const router = express.Router();
const controller = require('../controllers/announcementController');

router.post('/', controller.createAnnouncement);
router.get('/', controller.getAllAnnouncements);
router.get('/latest', controller.getLatestAnnouncements);
router.get('/:id', controller.getAnnouncementById);

module.exports = router;
