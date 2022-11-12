import MockDate from 'mockdate';
import {
  SaveSurveyResultRepository,
} from './DbSaveSurveyResultProtocols';
import { DbSaveSurveyResult } from './DbSaveSurveyResult';
import { mockLoadSurveyResultRepository, mockSaveSurveyResultRepository } from '@/data/test';
import { mockSurveyResult, mockSurveyResultParams } from '@/domain/tests/MockSurveyResult';
import { LoadSurveyResultRepository } from '@/data/protocols/db/surveyResult/LoadSurveyResultRepository';

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub);
  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  };
};

describe('Db Save Survey Result Use Case', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    await sut.save(mockSurveyResultParams());
    expect(saveSpy).toHaveBeenCalledWith(mockSurveyResultParams());
  });

  test('Should throw if SaveSurveyResultRepository throws', () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockRejectedValueOnce(new Error());
    const promise = sut.save(mockSurveyResultParams());
    expect(promise).rejects.toThrow();
  });

  test('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId');
    await sut.save(mockSurveyResultParams());
    expect(loadSpy).toHaveBeenCalledWith('any_surveyId');
  });

  test('Should throw if LoadSurveyResultRepository throws', () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockRejectedValueOnce(new Error());
    const promise = sut.save(mockSurveyResultParams());
    expect(promise).rejects.toThrow();
  });

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();
    const result = await sut.save(mockSurveyResultParams());
    expect(result).toEqual(mockSurveyResult());
  });

});