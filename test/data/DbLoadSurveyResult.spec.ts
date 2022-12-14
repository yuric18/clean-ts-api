import MockDate from 'mockdate';

import {
  DbLoadSurveyResult,
  LoadSurveyByIdRepository,
  LoadSurveyResultRepository,
} from '@/index';

import {
  mockLoadSurveyResultRepository,
  mockLoadSurveyByIdRepository,
} from 'test/data';

import { mockSurveyResult } from 'test/domain';

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
  );
  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
  };
};

describe('Db Load Survey Result', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId'
    );
    await sut.load('any_surveyId', 'any_accountId');
    expect(loadSpy).toHaveBeenCalledWith('any_surveyId', 'any_accountId');
  });

  test('Should throw if LoadSurveyResultRepository throws', () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockRejectedValueOnce(new Error());
    const promise = sut.load('any_surveyId', 'any_accountId');
    expect(promise).rejects.toThrow();
  });

  test('should call LoadSurveyByIdRepository with correct values if LoadSurveyResultRepository returns null', async () => {
    const {
      sut,
      loadSurveyResultRepositoryStub,
      loadSurveyByIdRepositoryStub,
    } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockResolvedValueOnce(null);

    const loadSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    await sut.load('any_surveyId', 'any_accountId');
    expect(loadSpy).toHaveBeenCalledWith('any_surveyId');
  });

  test('should return SurveyResultModel with all answers with count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockResolvedValueOnce(null);

    const result = await sut.load('any_surveyId', 'any_accountId');
    expect(result).toEqual(mockSurveyResult());
  });

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();
    const result = await sut.load('any_surveyId', 'any_accountId');
    expect(result).toEqual(mockSurveyResult());
  });
});
