import { DbLoadAnswersBySurvey, LoadAnswersBySurveyRepository } from '@/index';
import { mockLoadAnswersBySurveyRepository } from 'test/data';
import { mockSurvey } from 'test/domain';

type SutTypes = {
  sut: DbLoadAnswersBySurvey;
  loadAnswersBySurveyRepositoryStub: LoadAnswersBySurveyRepository;
};

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyRepositoryStub = mockLoadAnswersBySurveyRepository();
  const sut = new DbLoadAnswersBySurvey(loadAnswersBySurveyRepositoryStub);
  return {
    sut,
    loadAnswersBySurveyRepositoryStub,
  };
};

describe('Db Load Answers By Survey', () => {
  test('Should call LoadAnswersBySurveyRepository', async () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(
      loadAnswersBySurveyRepositoryStub,
      'loadBySurvey'
    );
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
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut();
    jest
      .spyOn(loadAnswersBySurveyRepositoryStub, 'loadBySurvey')
      .mockResolvedValueOnce([]);
    const answers = await sut.loadBySurvey('any_id');
    expect(answers).toEqual([]);
  });

  test('Should throw if LoadAnswersBySurveyRepository throws', () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut();
    jest
      .spyOn(loadAnswersBySurveyRepositoryStub, 'loadBySurvey')
      .mockRejectedValueOnce(new Error());
    const promise = sut.loadBySurvey('any_id');
    expect(promise).rejects.toThrow();
  });
});
