import { DbLoadAnswersBySurvey, LoadSurveyByIdRepository } from '@/index';
import { mockLoadSurveyByIdRepository } from 'test/data';
import { mockSurvey } from 'test/domain';

type SutTypes = {
  sut: DbLoadAnswersBySurvey;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadAnswersBySurvey(loadSurveyByIdRepositoryStub);
  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe('Db Load Answers By Survey', () => {
  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    await sut.loadBySurvey('any_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return answers on success', async () => {
    const { sut } = makeSut();
    const answers = await sut.loadBySurvey('any_id');
    expect(answers).toEqual([
      mockSurvey().answers[0].answer,
      mockSurvey().answers[1].answer,
    ]);
  });

  test('Should return empty array if no answers', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockResolvedValueOnce(null);
    const answers = await sut.loadBySurvey('any_id');
    expect(answers).toEqual([]);
  });

  test('Should throw if LoadSurveyByIdRepository throws', () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockRejectedValueOnce(new Error());
    const promise = sut.loadBySurvey('any_id');
    expect(promise).rejects.toThrow();
  });
});
