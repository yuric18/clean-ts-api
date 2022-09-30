import MockDate from 'mockdate';
import { 
  SaveSurveyResultRepository,
  SaveSurveyResultModel,
  SurveyResultModel,
} from './DbSaveSurveyResultProtocols';
import { DbSaveSurveyResult } from './DbSaveSurveyResult';

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any_accountId',
  surveyId: 'any_surveyId',
  answer: 'any_answer',
  date: new Date(),
});

const makeFakeSurveyResult = (): SurveyResultModel => Object.assign({}, makeFakeSurveyResultData(), {
  id: 'any_id',
});

const makeSaveSurveyResultRepositoryStub = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(): Promise<SurveyResultModel> {
      return Promise.resolve(makeFakeSurveyResult());
    }
  }
  return new SaveSurveyResultRepositoryStub();
};

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepositoryStub();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);
  return {
    sut,
    saveSurveyResultRepositoryStub,
  };
};

describe('Db Save Survey Result Use Case', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    await sut.save(makeFakeSurveyResultData());
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSurveyResultData());
  });

  test('Should throw if SaveSurveyResultRepository throws', () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockRejectedValueOnce(new Error());
    const promise = sut.save(makeFakeSurveyResultData());
    expect(promise).rejects.toThrow();
  });

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();
    const result = await sut.save(makeFakeSurveyResultData());
    expect(result).toEqual(makeFakeSurveyResult());
  });

});