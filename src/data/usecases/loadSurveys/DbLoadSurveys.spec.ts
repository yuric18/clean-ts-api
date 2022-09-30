import MockDate from 'mockdate';
import { SurveyModel } from '../../../domain/entities/Survey';
import { LoadSurveysRepository } from '../../protocols/db/survey/LoadSurveysRepository';
import { DbLoadSurveys } from './DbLoadSurveys';

const makeFakeSurveys = (): SurveyModel[] => ([{
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    image: 'any_image',
  }],
  id: 'any_id',
  date: new Date(),
}]);

describe('Db Load Surveys', () => {

  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
      async loadAll(): Promise<SurveyModel[]> {
        return Promise.resolve(makeFakeSurveys());
      }

    }
    const loadSurveysRepository = new LoadSurveysRepositoryStub();
    const loadAllSpy = jest.spyOn(loadSurveysRepository, 'loadAll');
    const sut = new DbLoadSurveys(loadSurveysRepository);
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });
});