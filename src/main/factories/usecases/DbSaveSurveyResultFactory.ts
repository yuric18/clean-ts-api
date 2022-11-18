import { DbSaveSurveyResult } from '@/data';
import { SaveSurveyResult } from '@/domain';
import { SurveyResultMongoRepository } from '@/infra';

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  return new DbSaveSurveyResult(
    surveyResultMongoRepository,
    surveyResultMongoRepository
  );
};
