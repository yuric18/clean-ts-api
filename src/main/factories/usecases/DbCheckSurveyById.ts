import { DbCheckSurveyById } from '@/data';
import { CheckSurveyById } from '@/domain';
import { SurveyMongoRepository } from '@/infra';

export const makeDbCheckSurveyById = (): CheckSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbCheckSurveyById(surveyMongoRepository);
};
