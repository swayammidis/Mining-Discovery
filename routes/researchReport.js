const express = require('express');
const router = express.Router();
const controller = require('../controllers/researchReportController');

// POST: Create a new research report
router.post('/', controller.createResearchReport);

// GET: Fetch all research reports
router.get('/', controller.getAllResearchReports);

// GET: Fetch the latest 3 research reports
router.get('/latest', controller.getLatestResearchReports);

// GET: Fetch a specific report by ID
router.get('/:id', controller.getResearchReportById);

module.exports = router;
