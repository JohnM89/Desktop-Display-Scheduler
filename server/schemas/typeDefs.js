// const { gql } = require('apollo-server');
// import { gql } from '@apollo/client';

const typeDefs = `
  # Represents a single activity but isn't utilized
  type Activity {
    id: ID!
    name: String!
    description: String
  }

  # Represents a day's schedule with a list of activities, how we will update the page
  type DaySchedule {
    day: String!
    activities: [Activity]!
  }


  type Query {
    # Get the schedule for a specific day wont be utilized
    getDaySchedule(day: String!): DaySchedule
    # Get the schedule for all days will be utilized
    getAllSchedules: [DaySchedule]!
  }


  type Mutation {
    # Adds a new activity to a specific day, will be utilized
    addActivity(day: String!, name: String!, description: String): DaySchedule
    # Updates an existing activity will be utilized
    updateActivity(id: ID!, name: String, description: String): Activity
    # Deletes an activity wont be utilized
    deleteActivity(id: ID!): Activity
  }
`;

export default typeDefs;