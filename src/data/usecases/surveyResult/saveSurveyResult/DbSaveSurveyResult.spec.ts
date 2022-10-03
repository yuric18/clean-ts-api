import MockDate from 'mockdate';
import { 
  SaveSurveyResultRepository,
} from './DbSaveSurveyResultProtocols';
import { DbSaveSurveyResult } from './DbSaveSurveyResult';
import { mockSaveSurveyResultRepository } from '@/data/test';
import { mockSurveyResult, mockSurveyResultParams } from '@/domain/tests/MockSurveyResult';

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);
  return {
    sut,
    saveSurveyResultRepositoryStub,
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

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();
    const result = await sut.save(mockSurveyResultParams());
    expect(result).toEqual(mockSurveyResult());
  });

});