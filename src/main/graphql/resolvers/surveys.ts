import { ApolloServerResolverAdapter } from '@/main/adapters';
import {
  makeAddSurveyController,
  makeLoadSurveysController,
} from '@/main/factories';

export default {
  Query: {
    surveys: async () =>
      ApolloServerResolverAdapter(makeLoadSurveysController()),
  },
  Mutation: {
    addSurvey: async (parent, args) =>
      ApolloServerResolverAdapter(makeAddSurveyController(), args),
  },
};
