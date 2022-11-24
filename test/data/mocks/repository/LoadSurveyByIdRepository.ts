import { LoadSurveyByIdRepository } from '@/index';

import { mockSurvey } from 'test/domain';

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<LoadSurveyByIdRepository.Output> {
      return Promise.resolve(mockSurvey());
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};
