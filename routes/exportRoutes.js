const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const Feedback = require('../models/Feedback');
const { parse } = require('json2csv');
const { authMiddleware } = require('../middleware/authMiddleware');

// @route   GET /api/export/ideas
// @desc    Export ideas to CSV
router.get('/ideas', authMiddleware, async (req, res) => {
  try {
    const ideas = await Idea.find();
    const fields = ['_id', 'title', 'description', 'author', 'status', 'createdAt'];
    const csv = parse(ideas, { fields });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=ideas.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/export/feedback
// @desc    Export feedback to CSV
router.get('/feedback', authMiddleware, async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    const fields = ['_id', 'ideaId', 'userId', 'comment', 'rating', 'createdAt'];
    const csv = parse(feedbacks, { fields });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=feedback.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
