const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectNewsController');

router.post('/project-news', controller.postProjectNews);
router.get('/project-news', controller.getAllProjectNews);
router.get('/project-news/:id', controller.getProjectNewsById);

module.exports = router;
