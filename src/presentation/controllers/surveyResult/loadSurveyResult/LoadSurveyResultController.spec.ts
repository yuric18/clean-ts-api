import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import { mockLoadSurveyById, mockLoadSurveyResult } from '@/presentation/test';
import {
  HttpRequest,
  InvalidParamError,
  LoadSurveyById,
} from '../saveSurveyResult/SaveSurveyResultControllerProtocols';
import {
  forbidden,
  ok,
  serverError,
} from '@/presentation/helpers/http/HttpHelper';
import { LoadSurveyResultController } from './LoadSurveyResultController';
import { mockSurveyResult } from '@/domain/tests/MockSurveyResult';

const makeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyByIdStub: LoadSurveyById;
  loadSurveyResultStub: LoadSurveyResult;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const loadSurveyResultStub = mockLoadSurveyResult();
  const sut = new LoadSurveyResultController(
    loadSurveyByIdStub,
    loadSurveyResultStub
  );
  return {
    sut,
    loadSurveyByIdStub,
    loadSurveyResultStub,
  };
};

describe('Load Survey Controller', () => {
  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(makeRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null);
    const response = await sut.handle(makeRequest());
    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await sut.handle(makeRequest());
    expect(response).toEqual(serverError(new Error()));
  });

  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load');
    await sut.handle(makeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_id');
  });

  test('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await sut.handle(makeRequest());
    expect(response).toEqual(serverError(new Error()));
  });

  test('should return 200 if success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeRequest());
    expect(response).toEqual(ok(mockSurveyResult()));
  });
});
