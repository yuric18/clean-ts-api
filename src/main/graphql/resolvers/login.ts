import { ApolloServerResolverAdapter } from '@/main/adapters';
import { makeLoginController, makeSignUpController } from '@/main/factories';

export default {
  Query: {
    login: async (parent, args) =>
      ApolloServerResolverAdapter(makeLoginController(), args),
  },
  Mutation: {
    signUp: async (parent, args) =>
      ApolloServerResolverAdapter(makeSignUpController(), args),
  },
};
