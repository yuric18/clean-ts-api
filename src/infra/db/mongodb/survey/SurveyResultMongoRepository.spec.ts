import MockDate from 'mockdate';
import { SurveyModel } from '@/domain/entities/Survey';
import { AccountModel } from '@/domain/entities/Account';
import { MongoHelper } from '../helpers/MongoHelper';
import { SurveyResultMongoRepository } from './SurveyResultMongoRepository';
import { ObjectId } from 'mongodb';
import { mockAddSurveyParams } from '@/domain/tests/MockSurvey';

const makeSurvey = async (): Promise<SurveyModel> => {
  await MongoHelper.getCollection('surveys');
  const survey = await MongoHelper.insert(mockAddSurveyParams());
  return MongoHelper.map(survey);
};

const makeAccount = async (): Promise<AccountModel> => {
  await MongoHelper.getCollection('accounts');
  const account = await MongoHelper.insert({
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  });
  return MongoHelper.map(account);
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
      expect(surveyResult.surveyId).toEqual(surveyId);
      expect(surveyResult.answers[0].count).toBe(1);
      expect(surveyResult.answers[0].percent).toBe(100);
      expect(surveyResult.answers[1].count).toBe(0);
      expect(surveyResult.answers[1].percent).toBe(0);
    });

    test('Should update a survey result if its not new', async () => {
      const sut = makeSut();

      const survey = await makeSurvey();
      const { id: accountId } = await makeAccount();

      await MongoHelper.getCollection('surveyResults');
      await MongoHelper.insert({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[1].answer,
        date: new Date(),
      });

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer);
      expect(surveyResult.answers[0].count).toBe(1);
      expect(surveyResult.answers[0].percent).toBe(100);
      expect(surveyResult.answers[1].count).toBe(0);
      expect(surveyResult.answers[1].percent).toBe(0);
    });
  });
});