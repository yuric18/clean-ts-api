import { ApolloServerResolverAdapter } from '@/main/adapters';
import { makeLoadSurveyResultController } from '@/main/factories';

export default {
  Query: {
    surveyResult: async (parent: any, args: any) =>
      ApolloServerResolverAdapter(makeLoadSurveyResultController(), args),
  },
};
