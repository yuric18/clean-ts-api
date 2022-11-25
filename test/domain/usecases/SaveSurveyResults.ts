import { SaveSurveyResult, SurveyResultModel } from '@/index';

import { mockSurveyResult } from '../entities';

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Input => ({
  accountId: 'any_accountId',
  surveyId: 'any_surveyId',
  answer: 'any_answer',
  date: new Date(),
});

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }

  return new SaveSurveyResultStub();
};
