import { LoadSurveysRepository, SurveyModel } from '@/index';

import { mockSurvey } from 'test/domain';

export const mockLoadSurveysRepositoryStub = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return Promise.resolve([mockSurvey()]);
    }
  }
  return new LoadSurveysRepositoryStub();
};
