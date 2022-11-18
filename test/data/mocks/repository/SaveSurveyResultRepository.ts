import { SaveSurveyResultRepository } from '@/index';

export const mockSaveSurveyResultRepository =
  (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
      async save(): Promise<void> {
        return Promise.resolve();
      }
    }
    return new SaveSurveyResultRepositoryStub();
  };
