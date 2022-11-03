import { SurveyModel } from '@/domain/entities/Survey';
import { mockSurvey } from '@/domain/tests/MockSurvey';
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(): Promise<SurveyModel> {
      return Promise.resolve(mockSurvey());
    }
  }

  return new LoadSurveyByIdStub();
};
