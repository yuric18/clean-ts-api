import MockDate from 'mockdate';
import { LoadSurveysController } from './LoadSurveysController';
import { LoadSurveys, SurveyModel } from './LoadSurveysControllerProtocols';
import { noContent, ok, serverError } from '@/presentation/helpers/http/HttpHelper';
import { mockSurveys } from '@/domain/tests/MockSurvey';

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveys());
    }
  }
  return new LoadSurveysStub();
};
type SutTypes = {
  sut: LoadSurveysController,
  loadSurveysStub: LoadSurveys
};



const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys();
  const sut = new LoadSurveysController(loadSurveysStub);
  return {
    sut,
    loadSurveysStub,
  };

};

describe('Load Surveys Controller', () => {
  
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(mockSurveys()));
  });

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, 'load')
      .mockResolvedValue([]);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test('should return 500 if LoadSurveys use case throws', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, 'load')
      .mockImplementationOnce(() => { throw new Error(); });
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});