import MockDate from 'mockdate';
import { LoadSurveyByIdRepository } from './DbLoadSurveyByIdProtocols';
import { DbLoadSurveyById } from './DbLoadSurveyById';
import { mockLoadSurveyByIdRepository } from '@/data/test';
import { mockSurvey } from '@/domain/tests/MockSurvey';

type SutTypes = {
  sut: DbLoadSurveyById,
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);
  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe('Db Load Surveys', () => {

  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    await sut.loadById('any_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return a survey on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.loadById('any_id');
    expect(surveys).toEqual(mockSurvey());
  });

  test('Should throw if LoadSurveyByIdRepository throws', () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockRejectedValueOnce(new Error());
    const promise = sut.loadById('any_id');
    expect(promise).rejects.toThrow();
  });
});