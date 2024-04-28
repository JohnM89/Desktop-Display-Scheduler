// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const dayScheduleSchema = new mongoose.Schema({
  day: { type: String, required: true, unique: true },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

const DaySchedule = mongoose.model('DaySchedule', dayScheduleSchema);

export default DaySchedule;
