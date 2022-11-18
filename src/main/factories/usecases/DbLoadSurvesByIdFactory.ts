import { DbLoadSurveyById } from '@/data';
import { LoadSurveyById } from '@/domain';
import { SurveyMongoRepository } from '@/infra';

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyById(surveyMongoRepository);
};
