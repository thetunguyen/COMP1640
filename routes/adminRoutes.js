const express = require("express");
const router = express.Router();
const authMiddleware = require("./middleware/authMiddleware");
const User = require("./models/User");

router.use(authMiddleware.verifyToken, authMiddleware.verifyAdmin);

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

module.exports = router;
