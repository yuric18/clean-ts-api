import { mockSurveyResult } from '@/domain/tests/MockSurveyResult';
import { SaveSurveyResultRepository } from '../protocols/db/surveyResult/SaveSurveyResultRepository';
import { SurveyResultModel } from '../usecases/surveyResult/saveSurveyResult/DbSaveSurveyResultProtocols';

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new SaveSurveyResultRepositoryStub();
};
