import { LoadSurveyResult } from '@/index';

import { mockSurveyResult } from '../entities';

export const mockLoadSurveyResult = () => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    load(
      surveyId: string,
      accountId: string
    ): Promise<LoadSurveyResult.Output> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultStub();
};
