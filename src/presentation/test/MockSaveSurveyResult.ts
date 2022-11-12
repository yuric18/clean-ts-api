import { SurveyResultModel } from '@/domain/entities/SurveyResult';
import { mockSurveyResult } from '@/domain/tests/MockSurveyResult';
import { SaveSurveyResult } from '@/domain/usecases/surveyResult/SaveSurveyResult';

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }

  return new SaveSurveyResultStub();
};
