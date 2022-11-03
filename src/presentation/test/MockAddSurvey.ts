import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/AddSurvey';

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(survey: AddSurveyParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new AddSurveyStub();
};