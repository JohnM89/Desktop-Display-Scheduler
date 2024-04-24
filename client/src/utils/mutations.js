import { gql } from '@apollo/client';

export const ADD_ACTIVITY_MUTATION = gql`
  mutation AddActivity($day: String!, $name: String!, $description: String) {
    addActivity(day: $day, name: $name, description: $description) {
      day
      activities {
        id
        name
        description
      }
    }
  }
`;