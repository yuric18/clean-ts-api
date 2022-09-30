import { DbLoadSurveys } from '../../../../data/usecases/loadSurveys/DbLoadSurveys';
import { LoadSurveys } from '../../../../domain/usecases/LoadSurveys';
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/SurveyMongoRepository';

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveys(surveyMongoRepository);
};
