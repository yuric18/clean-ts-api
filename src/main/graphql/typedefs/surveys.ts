import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    surveys: [Survey!]! @auth
  }

  extend type Mutation {
    addSurvey(question: String!, answers: [SurveyAnswerInput!]!): Survey @auth
  }

  type Survey {
    id: ID!
    question: String!
    answers: [SurveyAnswer!]!
    date: DateTime!
    didAnswer: Boolean
  }

  input SurveyAnswerInput {
    answer: String!
    image: String
  }

  type SurveyAnswer {
    answer: String!
    image: String
  }
`;
