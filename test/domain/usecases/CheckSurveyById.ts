import { CheckSurveyById } from '@/index';

export const mockCheckSurveyById = (): CheckSurveyById => {
  class CheckSurveyByIdStub implements CheckSurveyById {
    async checkById(): Promise<CheckSurveyById.Output> {
      return Promise.resolve(true);
    }
  }
  return new CheckSurveyByIdStub();
};
