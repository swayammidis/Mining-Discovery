const ResearchReport = require('../models/researchReport');
const TaggedPost = require('../models/TaggedPost');

// 🔹 Create a new research report
exports.createResearchReport = async (req, res) => {
  try {
    const { title, author, image, description, date, tags } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    const newReport = new ResearchReport({
      title: title.trim(),
      author: author?.trim() || 'Admin',
      image: image?.trim() || '',
      description: description.trim(),
      date: date ? new Date(date) : new Date(),
      tags: tags || []
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    console.error('❌ Error creating research report:', err.message);
    res.status(500).json({ error: 'Failed to create research report.' });
  }
};

// 🔹 Get all research reports
exports.getAllResearchReports = async (req, res) => {
  try {
    const reports = await ResearchReport.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error('❌ Error fetching all reports:', err.message);
    res.status(500).json({ error: 'Failed to fetch research reports.' });
  }
};

// 🔹 Get latest 3 research reports
exports.getLatestResearchReports = async (req, res) => {
  try {
    const latestReports = await ResearchReport.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json(latestReports);
  } catch (err) {
    console.error('❌ Error fetching latest reports:', err.message);
    res.status(500).json({ error: 'Failed to fetch latest research reports.' });
  }
};

// 🔹 Get a single research report by ID
exports.getResearchReportById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid report ID.' });
    }

    // First try from ResearchReport collection
    let report = await ResearchReport.findById(id);

    // If not found, try from TaggedPost collection
    if (!report) {
      report = await TaggedPost.findById(id);
    }

    if (!report) {
      return res.status(404).json({ error: 'Research report not found.' });
    }

    res.status(200).json(report);
  } catch (err) {
    console.error('❌ Error fetching report by ID:', err.message);
    res.status(500).json({ error: 'Failed to fetch research report.' });
  }
};
