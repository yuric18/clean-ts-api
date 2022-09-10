import { DbAddSurvey } from '../../../../data/usecases/addSurvey/DbAddSurvey';
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/SurveyMongoRepository';

export const makeDbAddSurveyFactory = (): DbAddSurvey => {
  const addSurveyRepository = new SurveyMongoRepository();
  return new DbAddSurvey(addSurveyRepository);
};