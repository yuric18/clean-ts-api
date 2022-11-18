import { DbAddSurvey } from '@/data';
import { SurveyMongoRepository } from '@/infra';

export const makeDbAddSurveyFactory = (): DbAddSurvey => {
  const addSurveyRepository = new SurveyMongoRepository();
  return new DbAddSurvey(addSurveyRepository);
};
