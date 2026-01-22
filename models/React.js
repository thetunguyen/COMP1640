const mongoose = require('mongoose');
const ReactSchema = new mongoose.Schema({
    react: { type: Number, enum: [1, -1, 0] }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ideaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea', required: true },
});

ReactSchema.index({ userId: 1, ideaId: 1 }, { unique: true });

module.exports = mongoose.model('React', ReactSchema);