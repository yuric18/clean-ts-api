import MockDate from 'mockdate';
import { SurveyModel } from '@/domain/entities/Survey';
import { AccountModel } from '@/domain/entities/Account';
import { MongoHelper } from '../helpers/MongoHelper';
import { SurveyResultMongoRepository } from './SurveyResultMongoRepository';

const makeSurvey = async (): Promise<SurveyModel> => {
  await MongoHelper.getCollection('surveys');
  const survey = await MongoHelper.insert({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer',
    }],
    date: new Date(),
  });
  return MongoHelper.map(survey);
};

const makeAccount = async (): Promise<AccountModel> => {
  await MongoHelper.getCollection('accounts');
  const survey = await MongoHelper.insert({
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  });
  return MongoHelper.map(survey);
};

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository();
};

describe('Survey Result Mongo Repository', () => {

  beforeAll(async () => {
    MockDate.set(new Date());
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    MockDate.reset();
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.getCollection('surveys');
    await MongoHelper.collection.deleteMany({});
    await MongoHelper.getCollection('surveyResults');
    await MongoHelper.collection.deleteMany({});
    await MongoHelper.getCollection('accounts');
    await MongoHelper.collection.deleteMany({});
  });
  
  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut();
      const { id: surveyId, answers } = await makeSurvey();
      const { id: accountId } = await makeAccount();
      const surveyResult = await sut.save({
        surveyId,
        accountId,
        answer: answers[0].answer,
        date: new Date(),
      });
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.id).toBeTruthy();
      expect(surveyResult.answer).toBe(answers[0].answer);
    });

    test('Should add a survey result if its not new', async () => {
      const sut = makeSut();

      const survey = await makeSurvey();
      const { id: accountId } = await makeAccount();

      await MongoHelper.getCollection('surveyResults');
      const data = await MongoHelper.insert({
        surveyId: survey.id,
        accountId: accountId,
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      const { id: existingId } = MongoHelper.map(data);

      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[0].answer,
        date: new Date(),
      });
      
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.id).toEqual(existingId);
      expect(surveyResult.answer).toBe(survey.answers[0].answer);
    });
  });
});