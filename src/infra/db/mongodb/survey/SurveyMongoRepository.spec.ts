import { AddSurveyModel } from '../../../../domain/usecases/AddSurvey';
import { MongoHelper } from '../helpers/MongoHelper';
import { SurveyMongoRepository } from './SurveyMongoRepository';

const makeFakeSurvey = (): AddSurveyModel => ({
  answers: [{
    answer: 'any_answer',
    image: 'any_image',
  }, {
    answer: 'other_answer',
  }],
  question: 'any_question',
});

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
};

describe('Account Mongo Repository', () => {

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.getCollection('survey');
    await MongoHelper.collection.deleteMany({});
  });

  test('Should return null on add success', async () => {
    const sut = makeSut();
    const survey = await sut.add(makeFakeSurvey());
    expect(survey).toBeNull();
  });

});
