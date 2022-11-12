import MockDate from 'mockdate';
import { AddSurveyRepository } from './DbAddSurveyProtocols';
import { DbAddSurvey } from './DbAddSurvey';
import { mockAddSurveyRepository } from '@/data/test';
import { mockAddSurveyParams, mockSurvey } from '@/domain/tests/MockSurvey';

type SutTypes = {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
};

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return {
    sut,
    addSurveyRepositoryStub,
  };
};

describe('Db Add Survey Use Case', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    await sut.add(mockAddSurveyParams());
    expect(addSpy).toHaveBeenCalledWith(mockAddSurveyParams());
  });

  test('Should throw if AddSurveyRepository throws', () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockRejectedValueOnce(new Error());
    const promise = sut.add(mockAddSurveyParams());
    expect(promise).rejects.toThrow();
  });
});
