import { mockSurveyResult } from '@/domain/tests/MockSurveyResult';
import { LoadSurveyResultRepository } from '../protocols/db/surveyResult/LoadSurveyResultRepository';
import { SaveSurveyResultRepository } from '../protocols/db/surveyResult/SaveSurveyResultRepository';
import { SurveyResultModel } from '../usecases/surveyResult/saveSurveyResult/DbSaveSurveyResultProtocols';

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new SaveSurveyResultRepositoryStub();
};

export const mockLoadSurveyResultRepository = () => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultRepositoryStub();
};