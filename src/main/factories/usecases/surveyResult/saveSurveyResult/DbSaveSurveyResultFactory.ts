import { DbSaveSurveyResult } from '@/data/usecases/surveyResult/saveSurveyResult/DbSaveSurveyResult';
import { SaveSurveyResult } from '@/domain/usecases/surveyResult/SaveSurveyResult';
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey/SurveyResultMongoRepository';

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  return new DbSaveSurveyResult(
    surveyResultMongoRepository,
    surveyResultMongoRepository
  );
};
