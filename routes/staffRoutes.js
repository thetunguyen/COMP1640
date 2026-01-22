const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/profile", (req, res) => {
  res.json({ name: req.user.name, email: req.user.email, role: req.user.role });
});

module.exports = router;
