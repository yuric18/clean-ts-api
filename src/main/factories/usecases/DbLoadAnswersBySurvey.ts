import { DbLoadAnswersBySurvey } from '@/data';
import { LoadAnswersBySurvey } from '@/domain';
import { SurveyMongoRepository } from '@/infra';

export const makeDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadAnswersBySurvey(surveyMongoRepository);
};
