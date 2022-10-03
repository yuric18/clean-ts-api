import MockDate from 'mockdate';
import { LoadSurveysRepository } from './DbLoadSurveysProtocols';
import { DbLoadSurveys } from './DbLoadSurveys';
import { mockLoadSurveysRepositoryStub } from '@/data/test';
import { mockSurveys } from '@/domain/tests/MockSurvey';

type SutTypes = {
  sut: DbLoadSurveys,
  loadSurveysRepositoryStub: LoadSurveysRepository
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
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test('Should return a list of surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.load();
    expect(surveys).toEqual(mockSurveys());
  });

  test('Should throw if LoadSurveysRepository throws', () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockRejectedValueOnce(new Error());
    const promise = sut.load();
    expect(promise).rejects.toThrow();
  });

});