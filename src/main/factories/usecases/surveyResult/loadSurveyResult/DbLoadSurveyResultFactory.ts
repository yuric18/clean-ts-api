import { DbLoadSurveyResult } from '@/data/usecases/surveyResult/loadSurveyResult/DbLoadSurveyResult';
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/SurveyMongoRepository';
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey/SurveyResultMongoRepository';

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyResult(
    surveyResultMongoRepository,
    surveyMongoRepository
  );
};
