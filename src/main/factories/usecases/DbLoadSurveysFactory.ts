import { DbLoadSurveys } from '@/data';
import { LoadSurveys } from '@/domain';
import { SurveyMongoRepository } from '@/infra';

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveys(surveyMongoRepository);
};
