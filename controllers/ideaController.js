const Idea = require('../models/Idea');
const Comment = require('../models/Comment');
const { body, validationResult } = require("express-validator");

const createIdea = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const idea = new Idea({
      title: req.body.title,
      description: req.body.description,
      topic: req.body.topic,
      image: req.file ? req.file.filename : null,
      user: req.user._id
    });
    await idea.save();
    res.status(201).json(idea);
  } catch (err) {
    res.status(500).json({ message: "Failed to create idea" });
  }
};

const getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().populate("user", "name email");
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ideas" });
  }
};

const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id).populate("user", "name email");
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch idea" });
  }
};

const updateIdea = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    if (idea.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Access denied" });

    idea.title = req.body.title;
    idea.description = req.body.description;
    idea.topic = req.body.topic;
    if (req.file) idea.image = req.file.filename;

    await idea.save();
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: "Failed to update idea" });
  }
};

const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    if (idea.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Access denied" });

    await idea.deleteOne();
    res.json({ message: "Idea deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete idea" });
  }
};

module.exports = { createIdea, getAllIdeas, getIdeaById, updateIdea, deleteIdea };
