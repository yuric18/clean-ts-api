import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import { mockLoadSurveyResult } from '@/presentation/test';
import {
  HttpRequest,
  InvalidParamError,
} from '../saveSurveyResult/SaveSurveyResultControllerProtocols';
import {
  forbidden,
  ok,
  serverError,
} from '@/presentation/helpers/http/HttpHelper';
import { LoadSurveyResultController } from './LoadSurveyResultController';
import { mockSurveyResult } from '@/domain/tests/MockSurveyResult';

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});

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

  test('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    jest.spyOn(loadSurveyResultStub, 'load').mockResolvedValueOnce(null);
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('should return 500 if LoadSurveyById throws', () => {
    const { sut, loadSurveyResultStub } = makeSut();
    jest.spyOn(loadSurveyResultStub, 'load').mockRejectedValue(new Error());
    const response = sut.handle(makeFakeRequest());
    expect(response).rejects.toEqual(serverError(new Error()));
  });

  test('should return 200 if success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(ok(mockSurveyResult()));
  });
});
