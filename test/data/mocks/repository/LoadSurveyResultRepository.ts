import { LoadSurveyResultRepository, SurveyResultModel } from '@/index';

import { mockSurveyResult } from 'test/domain';

export const mockLoadSurveyResultRepository = () => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    loadBySurveyId(
      surveyId: string,
      accountId: string
    ): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultRepositoryStub();
};
