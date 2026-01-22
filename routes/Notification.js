const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification'); // Tạo mới Notification.js
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/notifications
// @desc    Create a notification
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { userId, message, type } = req.body;
    const notification = new Notification({ userId, message, type });
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   GET /api/notifications
// @desc    Get all notifications for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
