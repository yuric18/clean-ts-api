import { AddSurveyRepository, DbAddSurvey } from '@/index';
import MockDate from 'mockdate';

import { mockAddSurveyRepository } from 'test/data';
import { mockAddSurveyInput } from 'test/domain';

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
    await sut.add(mockAddSurveyInput());
    expect(addSpy).toHaveBeenCalledWith(mockAddSurveyInput());
  });

  test('Should throw if AddSurveyRepository throws', () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockRejectedValueOnce(new Error());
    const promise = sut.add(mockAddSurveyInput());
    expect(promise).rejects.toThrow();
  });
});
