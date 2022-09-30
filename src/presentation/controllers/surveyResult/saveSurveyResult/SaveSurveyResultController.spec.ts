import MockDate from 'mockdate';
import {
  HttpRequest,
  LoadSurveyById,
  SurveyModel,
  InvalidParamError,
  forbidden,
  serverError,
  SaveSurveyResult,
  SurveyResultModel,
  ok,
} from './SaveSurveyResultControllerProtocols';
import { SaveSurveyResultController } from './SaveSurveyResultController';

const makeFakeHttpRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id',
  },
  body: {
    answer: 'any_answer',
  },
  accountId: 'any_account_id',
});

const makeFakeSurvey = (): SurveyModel => ({
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    image: 'any_image',
  }],
  id: 'any_id',
  date: new Date(),
});

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(): Promise<SurveyModel> {
      return Promise.resolve(makeFakeSurvey());
    }
  }

  return new LoadSurveyByIdStub();
};

const makeFakeSurveyResult = (): SurveyResultModel => ({
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date(),
  id: 'any_id',
  surveyId: 'any_surveyId',
});

const makeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(): Promise<SurveyResultModel> {
      return Promise.resolve(makeFakeSurveyResult());
    }
  }

  return new SaveSurveyResultStub();
};

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
  saveSurveyResultStub: SaveSurveyResult
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById();
  const saveSurveyResultStub = makeSaveSurveyResult();
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub);
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
    await sut.handle(makeFakeHttpRequest());
    expect(validateSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    const validateSpy = jest.spyOn(saveSurveyResultStub, 'save');
    await sut.handle(makeFakeHttpRequest());
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
    const response = await sut.handle(makeFakeHttpRequest());
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
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValueOnce(new Error());
    const response = await sut.handle(makeFakeHttpRequest());
    expect(response).toEqual(serverError(new Error()));
  });

  test('should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(new Error());
    const response = await sut.handle(makeFakeHttpRequest());
    expect(response).toEqual(serverError(new Error()));
  });

  
  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeFakeHttpRequest());
    expect(response).toEqual(ok(makeFakeSurveyResult()));
  });
});