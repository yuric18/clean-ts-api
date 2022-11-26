import { ApolloServerResolverAdapter } from '@/main/adapters';
import { makeLoadSurveysController } from '@/main/factories';

export default {
  Query: {
    surveys: async () =>
      ApolloServerResolverAdapter(makeLoadSurveysController()),
  },
};
