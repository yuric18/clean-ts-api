import { mockSurveyResult } from '@/domain/tests/MockSurveyResult';
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import {
  HttpRequest,
  SurveyResultModel,
} from '../saveSurveyResult/SaveSurveyResultControllerProtocols';
import { LoadSurveyResultController } from './LoadSurveyResultController';

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});

const mockLoadSurveyResult = () => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    load(surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultStub();
};

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyResultStub: LoadSurveyResult;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultStub = mockLoadSurveyResult();
  const sut = new LoadSurveyResultController(loadSurveyResultStub);
  return {
    sut,
    loadSurveyResultStub,
  };
};

describe('Load Survey Controller', () => {
  test('should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load');
    await sut.handle(makeFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_id');
  });
});
