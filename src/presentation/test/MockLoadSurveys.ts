import { SurveyModel } from '@/domain/entities/Survey';
import { mockSurveys } from '@/domain/tests/MockSurvey';
import { LoadSurveys } from '@/domain/usecases/survey/LoadSurveys';

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveys());
    }
  }
  return new LoadSurveysStub();
};