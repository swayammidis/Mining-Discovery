const ProjectNews = require('../models/ProjectNews');

exports.postProjectNews = async (req, res) => {
  try {
    const { title, date, by, description, image } = req.body;

    const news = new ProjectNews({ title, date, by, description, image });
    await news.save();
    res.status(201).json({ message: 'Project news posted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to post project news' });
  }
};

exports.getAllProjectNews = async (req, res) => {
  try {
    const news = await ProjectNews.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project news' });
  }
};

exports.getProjectNewsById = async (req, res) => {
  try {
    const news = await ProjectNews.findById(req.params.id);
    res.json(news);
  } catch (err) {
    res.status(404).json({ error: 'News not found' });
  }
};
