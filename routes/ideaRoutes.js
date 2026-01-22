const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea'); // Tạo mới Idea.js
const { authMiddleware } = require('../middleware/authMiddleware');

// @route   POST /api/ideas
// @desc    Create a new idea
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, author, status } = req.body;
    const idea = new Idea({ title, description, author, status });
    await idea.save();
    res.status(201).json(idea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   GET /api/ideas
// @desc    Get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/ideas/:id
// @desc    Get a single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ error: 'Idea not found' });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   PUT /api/ideas/:id
// @desc    Update an idea
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!idea) return res.status(404).json({ error: 'Idea not found' });
    res.json(idea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   DELETE /api/ideas/:id
// @desc    Delete an idea
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    if (!idea) return res.status(404).json({ error: 'Idea not found' });
    res.json({ message: 'Idea deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
