import { AddSurveyRepository } from '@/index';

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(
      survey: AddSurveyRepository.Input
    ): Promise<AddSurveyRepository.Output> {
      return Promise.resolve();
    }
  }
  return new AddSurveyRepositoryStub();
};
