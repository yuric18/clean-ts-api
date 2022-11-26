import { ApolloServerResolverAdapter } from '@/main/adapters';
import { makeLoginController } from '@/main/factories';

export default {
  Query: {
    login: async (parent, args) =>
      ApolloServerResolverAdapter(makeLoginController(), args),
  },
};
