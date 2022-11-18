import MockDate from 'mockdate';
import { ObjectId } from 'mongodb';

import { MongoHelper, SurveyMongoRepository } from '@/index';
import { mockSurvey } from 'test/domain';

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
};

describe('Survey Mongo Repository', () => {
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
  });

  describe('add()', () => {
    test('Should return null on add success', async () => {
      const sut = makeSut();
      const addResult = await sut.add(mockSurvey());
      const survey = await MongoHelper.collection.findOne({
        question: 'any_question',
      });
      expect(addResult).toBeNull();
      expect(survey).toBeTruthy();
    });
  });

  describe('loadAll()', () => {
    test('should load all surveys on success', async () => {
      const surveysToAdd = [mockSurvey(), mockSurvey()];
      const {
        insertedIds: { 0: surveyId },
      } = await MongoHelper.collection.insertMany(surveysToAdd);

      await MongoHelper.getCollection('surveyResults');
      const inserted = await MongoHelper.insert({
        surveyId,
        accountId: new ObjectId('6336e1f27292da6d2d9fc718'),
        answer: surveysToAdd[0].answers[0].answer,
        date: new Date(),
      });

      console.log('inserted', inserted);

      console.log(await MongoHelper.collection.find({}).toArray());

      const sut = makeSut();
      const surveys = await sut.loadAll('6336e1f27292da6d2d9fc718');
      console.log(surveys);
      expect(surveys.length).toBe(2);
      expect(surveys[0].id).toBeTruthy();
      expect(surveys[0].didAnswer).toBe(true);
      expect(surveys[1].id).toBeTruthy();
      expect(surveys[1].didAnswer).toBe(false);
    });

    test('should return empty list when no content', async () => {
      const sut = makeSut();
      const surveys = await sut.loadAll('6336e1f27292da6d2d9fc718');
      expect(surveys.length).toBe(0);
    });
  });

  describe('loadById()', () => {
    test('should load survey by id on success', async () => {
      const res = await MongoHelper.insert(mockSurvey());
      const { id } = await MongoHelper.map(res);
      const sut = makeSut();
      const survey = await sut.loadById(id);
      expect(survey).toBeTruthy();
      expect(survey.id).toBeTruthy();
    });

    test('should return empty list when no content', async () => {
      const sut = makeSut();
      const survey = await sut.loadById('6336e1f27292da6d2d9fc718');
      expect(survey).toBeNull();
    });
  });
});
