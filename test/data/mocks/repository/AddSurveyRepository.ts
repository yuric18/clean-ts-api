import { AddSurveyRepository, AddSurveyParams } from '@/index';

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(survey: AddSurveyParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new AddSurveyRepositoryStub();
};
