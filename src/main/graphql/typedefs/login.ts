import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    login(email: String!, password: String!): Account!
  }

  type Account {
    accessToken: String!
    name: String!
  }

  extend type Mutation {
    signUp(
      name: String!
      email: String!
      password: String!
      passwordConfirmation: String!
      role: String
    ): Account!
  }
`;
