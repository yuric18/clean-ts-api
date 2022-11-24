import { DbCheckSurveyById, CheckSurveyByIdRepository } from '@/index';
import { mockCheckSurveyByIdRepository } from 'test/data';

type SutTypes = {
  sut: DbCheckSurveyById;
  checkSurveyByIdRepositoryStub: CheckSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositoryStub = mockCheckSurveyByIdRepository();
  const sut = new DbCheckSurveyById(checkSurveyByIdRepositoryStub);
  return {
    sut,
    checkSurveyByIdRepositoryStub: checkSurveyByIdRepositoryStub,
  };
};

describe('Db Check Survey By Id', () => {
  test('Should call CheckSurveybyIdRepository', async () => {
    const { sut, checkSurveyByIdRepositoryStub } = makeSut();
    const checkByIdSpy = jest.spyOn(checkSurveyByIdRepositoryStub, 'checkById');
    await sut.checkById('any_id');
    expect(checkByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return true on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.checkById('any_id');
    expect(surveys).toBe(true);
  });

  test('Should throw if CheckSurveyByIdRepository throws', () => {
    const { sut, checkSurveyByIdRepositoryStub } = makeSut();
    jest
      .spyOn(checkSurveyByIdRepositoryStub, 'checkById')
      .mockRejectedValueOnce(new Error());
    const promise = sut.checkById('any_id');
    expect(promise).rejects.toThrow();
  });
});
