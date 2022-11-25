import MockDate from 'mockdate';

import {
  LoadAnswersBySurvey,
  InvalidParamError,
  forbidden,
  serverError,
  SaveSurveyResult,
  ok,
  SaveSurveyResultController,
} from '@/index';

import {
  mockSaveSurveyResult,
  mockLoadAnswersBySurvey,
  mockSurveyResult,
} from 'test/domain';

const makeInput = (): SaveSurveyResultController.Input => ({
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  accountId: 'any_account_id',
});

type SutTypes = {
  sut: SaveSurveyResultController;
  loadAnswersBySurveyStub: LoadAnswersBySurvey;
  saveSurveyResultStub: SaveSurveyResult;
};

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyStub = mockLoadAnswersBySurvey();
  const saveSurveyResultStub = mockSaveSurveyResult();
  const sut = new SaveSurveyResultController(
    loadAnswersBySurveyStub,
    saveSurveyResultStub
  );
  return {
    sut,
    loadAnswersBySurveyStub,
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

  test('should call LoadAnswersBySurvey with correct values', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut();
    const loadBySurveySpy = jest.spyOn(loadAnswersBySurveyStub, 'loadBySurvey');
    await sut.handle(makeInput());
    expect(loadBySurveySpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('should return 403 if answer is not found', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut();
    jest
      .spyOn(loadAnswersBySurveyStub, 'loadBySurvey')
      .mockResolvedValueOnce(null);
    const response = await sut.handle(makeInput());
    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut();
    const response = await sut.handle({
      surveyId: 'any_survey_id',
      answer: 'wrong_answer',
      accountId: 'any_accountId',
    });
    expect(response).toEqual(forbidden(new InvalidParamError('answer')));
  });

  test('should return 500 if LoadAnswersBySurvey throws', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut();
    jest
      .spyOn(loadAnswersBySurveyStub, 'loadBySurvey')
      .mockRejectedValueOnce(new Error());
    const response = await sut.handle(makeInput());
    expect(response).toEqual(serverError(new Error()));
  });

  test('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    const validateSpy = jest.spyOn(saveSurveyResultStub, 'save');
    await sut.handle(makeInput());
    expect(validateSpy).toHaveBeenCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      date: new Date(),
      answer: 'any_answer',
    });
  });

  test('should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(new Error());
    const response = await sut.handle(makeInput());
    expect(response).toEqual(serverError(new Error()));
  });

  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeInput());
    expect(response).toEqual(ok(mockSurveyResult()));
  });
});
