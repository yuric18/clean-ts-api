import MockDate from 'mockdate';

import { DbLoadSurveys, LoadSurveysRepository } from '@/index';
import { mockLoadSurveysRepositoryStub } from 'test/data';
import { mockSurvey } from 'test/domain';

type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: LoadSurveysRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepositoryStub();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
  return {
    sut,
    loadSurveysRepositoryStub,
  };
};

describe('Db Load Surveys', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.load('any_accountId');
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test('Should return a list of surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.load('any_accountId');
    expect(surveys).toEqual([mockSurvey()]);
  });

  test('Should throw if LoadSurveysRepository throws', () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockRejectedValueOnce(new Error());
    const promise = sut.load('any_accountId');
    expect(promise).rejects.toThrow();
  });
});
