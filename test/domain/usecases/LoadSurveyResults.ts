import { LoadSurveyResult, SurveyResultModel } from '@/index';

import { mockSurveyResult } from '../entities';

export const mockLoadSurveyResult = () => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultStub();
};
