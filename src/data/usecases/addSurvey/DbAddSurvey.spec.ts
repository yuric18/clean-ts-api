import { AddSurveyRepository } from '../../protocols/db/survey/AddSurveyRepository';
import { AddSurveyModel } from '../../../domain/usecases/AddSurvey';
import { DbAddSurvey } from './DbAddSurvey';

const makeFakeSurvey = (): AddSurveyModel => ({
  answers: [{ answer: 'any_answer', image: 'any_image' }],
  question: 'any_question',
});

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(survey: AddSurveyModel): Promise<void> {
      return Promise.resolve();
    }
  }
  return new AddSurveyRepositoryStub();
};

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
};

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return {
    sut,
    addSurveyRepositoryStub,
  };
};

describe('Db Add Survey Use Case', () => {
  test('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    await sut.add(makeFakeSurvey());
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurvey());
  });
});