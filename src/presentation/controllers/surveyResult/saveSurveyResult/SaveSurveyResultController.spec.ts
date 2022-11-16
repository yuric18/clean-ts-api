import MockDate from 'mockdate';
import {
  HttpRequest,
  LoadSurveyById,
  InvalidParamError,
  forbidden,
  serverError,
  SaveSurveyResult,
  ok,
} from './SaveSurveyResultControllerProtocols';
import { SaveSurveyResultController } from './SaveSurveyResultController';
import { mockSaveSurveyResult, mockLoadSurveyById } from '@/presentation/test';
import { mockSurveyResult } from '@/domain/tests/MockSurveyResult';

const makeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id',
  },
  body: {
    answer: 'any_answer',
  },
  accountId: 'any_account_id',
});

type SutTypes = {
  sut: SaveSurveyResultController;
  loadSurveyByIdStub: LoadSurveyById;
  saveSurveyResultStub: SaveSurveyResult;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const saveSurveyResultStub = mockSaveSurveyResult();
  const sut = new SaveSurveyResultController(
    loadSurveyByIdStub,
    saveSurveyResultStub
  );
  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub,
  };
};

describe('Save Survey Result Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const validateSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(makeRequest());
    expect(validateSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    const validateSpy = jest.spyOn(saveSurveyResultStub, 'save');
    await sut.handle(makeRequest());
    expect(validateSpy).toHaveBeenCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      date: new Date(),
      answer: 'any_answer',
    });
  });

  test('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null);
    const response = await sut.handle(makeRequest());
    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut();
    const response = await sut.handle({
      params: {
        surveyId: 'any_survey_id',
      },
      body: {
        answer: 'wrong_answer',
      },
    });
    expect(response).toEqual(forbidden(new InvalidParamError('answer')));
  });

  test('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockRejectedValueOnce(new Error());
    const response = await sut.handle(makeRequest());
    expect(response).toEqual(serverError(new Error()));
  });

  test('should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(new Error());
    const response = await sut.handle(makeRequest());
    expect(response).toEqual(serverError(new Error()));
  });

  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeRequest());
    expect(response).toEqual(ok(mockSurveyResult()));
  });
});
