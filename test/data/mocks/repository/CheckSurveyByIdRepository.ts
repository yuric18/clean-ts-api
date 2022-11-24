import { CheckSurveyByIdRepository } from '@/index';

export const mockCheckSurveyByIdRepository = (): CheckSurveyByIdRepository => {
  class CheckSurveyByIdRepositoryStub implements CheckSurveyByIdRepository {
    async checkById(id: string): Promise<CheckSurveyByIdRepository.Output> {
      return Promise.resolve(!!{});
    }
  }
  return new CheckSurveyByIdRepositoryStub();
};
