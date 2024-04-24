const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false } //not utilized
});

const dayScheduleSchema = new mongoose.Schema({
  day: { type: String, required: true, unique: true },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

const Activity = mongoose.model('Activity', activitySchema);
const DaySchedule = mongoose.model('DaySchedule', dayScheduleSchema);

module.exports = { Activity, DaySchedule };
