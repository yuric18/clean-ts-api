import { LoadSurveys, SurveyModel } from '@/index';

import { mockSurvey } from '../entities';

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<LoadSurveys.Output> {
      return Promise.resolve([mockSurvey()]);
    }
  }
  return new LoadSurveysStub();
};
