const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
	user: { type: String, required: true, unique: true },
	goal_title: { type: String },
	goal_desc: { type: String },
	due_time: { type: Date },
	created_at: { type: Date, required: true, default: Date.now },
	updated_at: { type: Date, required: true }
});

module.exports = mongoose.model('Time', goalSchema);
