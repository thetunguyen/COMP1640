const express = require('express');
const router = express.Router();
const { adminMiddleware } = require('../middleware/authMiddleware');
const Idea = require('../models/Idea');
const Feedback = require('../models/Feedback');

// @route   GET /api/admin/ideas
// @desc    Get all ideas (Admin only)
router.get('/ideas', adminMiddleware, async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   PUT /api/admin/ideas/:id/status
// @desc    Update idea status (Admin only)
router.put('/ideas/:id/status', adminMiddleware, async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!idea) return res.status(404).json({ error: 'Idea not found' });
    res.json(idea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
