import { LoadSurveyById, SurveyModel } from '@/index';

import { mockSurvey } from '../entities';

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(): Promise<SurveyModel> {
      return Promise.resolve(mockSurvey());
    }
  }
  return new LoadSurveyByIdStub();
};
