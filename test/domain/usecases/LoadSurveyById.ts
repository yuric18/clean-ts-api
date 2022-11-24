import { LoadAnswersBySurvey } from '@/index';

export const mockLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  class LoadAnswersBySurveyStub implements LoadAnswersBySurvey {
    async loadBySurvey(): Promise<string[]> {
      return Promise.resolve(['any_answer']);
    }
  }
  return new LoadAnswersBySurveyStub();
};
