import { ApolloServerResolverAdapter } from '@/main/adapters';
import {
  makeLoadSurveyResultController,
  makeSaveSurveyResultController,
} from '@/main/factories';

export default {
  Query: {
    surveyResult: async (parent: any, args: any) =>
      ApolloServerResolverAdapter(makeLoadSurveyResultController(), args),
  },
  Mutation: {
    saveSurveyResult: async (parent: any, args: any) =>
      ApolloServerResolverAdapter(makeSaveSurveyResultController(), args),
  },
};
