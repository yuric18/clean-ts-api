import { LoadAnswersBySurveyRepository } from '@/index';

export const mockLoadAnswersBySurveyRepository =
  (): LoadAnswersBySurveyRepository => {
    class LoadAnswersBySurveyRepositoryStub
      implements LoadAnswersBySurveyRepository
    {
      async loadBySurvey(
        id: string
      ): Promise<LoadAnswersBySurveyRepository.Output> {
        return Promise.resolve(['any_answer', 'other_answer']);
      }
    }
    return new LoadAnswersBySurveyRepositoryStub();
  };
