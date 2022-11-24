import MockDate from 'mockdate';

import {
  LoadSurveyResult,
  InvalidParamError,
  ok,
  forbidden,
  serverError,
  LoadSurveyResultController,
  CheckSurveyById,
} from '@/index';

import {
  mockCheckSurveyById,
  mockLoadSurveyResult,
  mockSurveyResult,
} from 'test/domain';

const makeInput = (): LoadSurveyResultController.Input => ({
  accountId: 'any_accountId',
  surveyId: 'any_id',
});

type SutTypes = {
  sut: LoadSurveyResultController;
  checkSurveyByIdStub: CheckSurveyById;
  loadSurveyResultStub: LoadSurveyResult;
};

const makeSut = (): SutTypes => {
  const checkSurveyByIdStub = mockCheckSurveyById();
  const loadSurveyResultStub = mockLoadSurveyResult();
  const sut = new LoadSurveyResultController(
    checkSurveyByIdStub,
    loadSurveyResultStub
  );
  return {
    sut,
    checkSurveyByIdStub,
    loadSurveyResultStub,
  };
};

describe('Load Survey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call CheckSurveyById with correct values', async () => {
    const { sut, checkSurveyByIdStub } = makeSut();
    const checkByIdSpy = jest.spyOn(checkSurveyByIdStub, 'checkById');
    await sut.handle(makeInput());
    expect(checkByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('should return 403 if CheckSurveyById returns null', async () => {
    const { sut, checkSurveyByIdStub } = makeSut();
    jest.spyOn(checkSurveyByIdStub, 'checkById').mockResolvedValueOnce(null);
    const response = await sut.handle(makeInput());
    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('should return 500 if CheckSurveyById throws', async () => {
    const { sut, checkSurveyByIdStub } = makeSut();
    jest.spyOn(checkSurveyByIdStub, 'checkById').mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await sut.handle(makeInput());
    expect(response).toEqual(serverError(new Error()));
  });

  test('should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load');
    await sut.handle(makeInput());
    expect(loadSpy).toHaveBeenCalledWith('any_id', 'any_accountId');
  });

  test('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await sut.handle(makeInput());
    expect(response).toEqual(serverError(new Error()));
  });

  test('should return 200 if success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeInput());
    expect(response).toEqual(ok(mockSurveyResult()));
  });
});
