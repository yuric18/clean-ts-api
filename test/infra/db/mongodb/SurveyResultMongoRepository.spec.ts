import MockDate from 'mockdate';
import { ObjectId } from 'mongodb';

import {
  SurveyModel,
  AccountModel,
  MongoHelper,
  SurveyResultMongoRepository,
} from '@/index';

import { mockAddSurveyInput } from 'test/domain';

let surveysCollection;
let surveyResultsCollection;
let accountsCollection;

const makeSurvey = async (): Promise<SurveyModel> => {
  const survey = await MongoHelper.insertOne('surveys', mockAddSurveyInput());
  return MongoHelper.map(survey);
};

const makeAccount = async (): Promise<AccountModel> => {
  const account = await MongoHelper.insertOne('accounts', {
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
    surveysCollection = MongoHelper.getCollection('surveys');
    await surveysCollection.deleteMany({});
    surveyResultsCollection = MongoHelper.getCollection('surveyResults');
    await surveyResultsCollection.deleteMany({});
    accountsCollection = MongoHelper.getCollection('accounts');
    await accountsCollection.deleteMany({});
  });

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut();
      const { id: surveyId, answers } = await makeSurvey();
      const { id: accountId } = await makeAccount();

      await sut.save({
        surveyId,
        accountId,
        answer: answers[0].answer,
        date: new Date(),
      });

      const surveys = await surveyResultsCollection.findOne({
        surveyId,
        accountId,
      });

      expect(surveys).toBeTruthy();
    });

    test('Should update a survey result if its not new', async () => {
      const sut = makeSut();

      const { id: surveyId, ...survey } = await makeSurvey();
      const { id: accountId } = await makeAccount();

      await MongoHelper.insertOne('surveyResults', {
        surveyId: new ObjectId(surveyId),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      await sut.save({
        surveyId: surveyId,
        accountId,
        answer: survey.answers[1].answer,
        date: new Date(),
      });

      const results = await surveyResultsCollection
        .find({
          surveyId,
          accountId,
        })
        .toArray();

      expect(results.length).toBe(1);
    });
  });

  describe('loadBySurveyId()', () => {
    test('should load survey result', async () => {
      const sut = makeSut();
      const { id: surveyId, ...survey } = await makeSurvey();
      const { id: accountId } = await makeAccount();
      const { id: accountId2 } = await makeAccount();

      await surveyResultsCollection.insertMany([
        {
          surveyId: new ObjectId(surveyId),
          accountId: new ObjectId(accountId),
          answer: survey.answers[0].answer,
          date: new Date(),
        },
        {
          surveyId: new ObjectId(surveyId),
          accountId: new ObjectId(accountId2),
          answer: survey.answers[1].answer,
          date: new Date(),
        },
      ]);

      const surveyResult = await sut.loadBySurveyId(surveyId, accountId);
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.answers[0].count).toBe(1);
      expect(surveyResult.answers[0].percent).toBe(50);
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true);
      expect(surveyResult.answers[1].count).toBe(1);
      expect(surveyResult.answers[1].percent).toBe(50);
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false);
      expect(surveyResult.answers[2].count).toBe(0);
      expect(surveyResult.answers[2].percent).toBe(0);
      expect(surveyResult.answers[2].isCurrentAccountAnswer).toBe(false);
    });

    test('should return null if there is no survey result', async () => {
      const sut = makeSut();
      const surveyResults = await sut.loadBySurveyId(
        '6336e1f27292da6d2d9fc718',
        '6336e1f27292da6d2d9fc718'
      );
      expect(surveyResults).toBeNull();
    });
  });
});
