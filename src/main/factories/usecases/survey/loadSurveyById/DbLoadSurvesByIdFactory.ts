import { DbLoadSurveyById } from '@/data/usecases/survey/loadSurveyById/DbLoadSurveyById';
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/SurveyMongoRepository';

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyById(surveyMongoRepository);
};
