import DaySchedule from '../models/schedule.js';

const resolvers = {
  Query: {
    getDaySchedule: async (_, { day }) => await DaySchedule.findOne({ where: { day }, include: 'activities' }),
    getAllSchedules: async () => await DaySchedule.findAll({ include: 'activities' })
  },
  Mutation: {
    addActivity: async (_, { day, name, description }) => {
      const daySchedule = await DaySchedule.findOne({ where: { day } });
      const activity = await Activity.create({ name, description });
      await daySchedule.addActivity(activity);
      return daySchedule.reload();
    }
  }
};

export default resolvers;
