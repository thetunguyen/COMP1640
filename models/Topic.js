const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Topic", TopicSchema);
