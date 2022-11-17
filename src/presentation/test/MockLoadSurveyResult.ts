import { SurveyResultModel } from '@/domain/entities/SurveyResult';
import { mockSurveyResult } from '@/domain/tests/MockSurveyResult';
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';

export const mockLoadSurveyResult = () => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultStub();
};
