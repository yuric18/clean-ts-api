import { LoadSurveyByIdRepository, SurveyModel } from '@/index';

import { mockSurvey } from 'test/domain';

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurvey());
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};
