import { mockSurvey, mockSurveys } from '@/domain/tests/MockSurvey';
import { AddSurveyRepository } from '../protocols/db/survey/AddSurveyRepository';
import { LoadSurveyByIdRepository } from '../protocols/db/survey/LoadSurveyByIdRepository';
import { LoadSurveysRepository } from '../protocols/db/survey/LoadSurveysRepository';
import { AddSurveyParams } from '../usecases/survey/addSurvey/DbAddSurveyProtocols';
import { SurveyModel } from '../usecases/survey/loadSurveyById/DbLoadSurveyByIdProtocols';

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(survey: AddSurveyParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurvey());
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};

export const mockLoadSurveysRepositoryStub = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveys());
    }
  }
  return new LoadSurveysRepositoryStub();
};