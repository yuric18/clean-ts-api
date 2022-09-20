import MockDate from 'mockdate';
import { LoadSurveysController } from './LoadSurveysController';
import { LoadSurveys, SurveyModel } from './LoadSurveysControllerProtocols';

const makeFakeSurveys = (): SurveyModel[] => ([{
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    image: 'any_image',
  }],
  id: 'any_id',
  date: new Date(),
}]);

describe('Load Surveys Controller', () => {
  
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveys', async () => {
    class LoadSurveysStub implements LoadSurveys {
      async load(): Promise<SurveyModel[]> {
        return Promise.resolve(makeFakeSurveys());
      }
    }
    const loadSurveysStub = new LoadSurveysStub();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    const sut = new LoadSurveysController(loadSurveysStub);
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });
});