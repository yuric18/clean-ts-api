import MockDate from 'mockdate';
import { ObjectId } from 'mongodb';

import { MongoHelper, SurveyMongoRepository } from '@/index';
import { mockSurvey } from 'test/domain';

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
};

let surveysCollection;
let surveyResultCollection;

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    MockDate.set(new Date());
    await MongoHelper.connect(process.env.MONGO_URL);
    surveysCollection = MongoHelper.getCollection('surveys');
    surveyResultCollection = MongoHelper.getCollection('surveyResults');
  });

  afterAll(async () => {
    MockDate.reset();
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await surveysCollection.deleteMany({});
    await surveyResultCollection.deleteMany({});
  });

  describe('add()', () => {
    test('Should return null on add success', async () => {
      const sut = makeSut();
      const addResult = await sut.add(mockSurvey());
      const survey = await surveysCollection.findOne({
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
      } = await surveysCollection.insertMany(surveysToAdd);

      await MongoHelper.insertOne('surveyResults', {
        surveyId,
        accountId: new ObjectId('6336e1f27292da6d2d9fc718'),
        answer: surveysToAdd[0].answers[0].answer,
        date: new Date(),
      });

      const sut = makeSut();
      const surveys = await sut.loadAll('6336e1f27292da6d2d9fc718');
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

  describe('loadBySurvey()', () => {
    test('should load answers on success', async () => {
      const res = await MongoHelper.insertOne('surveys', mockSurvey());
      const survey = await MongoHelper.map(res);
      const sut = makeSut();
      const answers = await sut.loadBySurvey(survey.id);
      expect(answers).toEqual([
        survey.answers[0].answer,
        survey.answers[1].answer,
      ]);
    });

    test('should return empty list when no content', async () => {
      const sut = makeSut();
      const survey = await sut.loadBySurvey('6336e1f27292da6d2d9fc718');
      expect(survey).toEqual([]);
    });
  });

  describe('loadById()', () => {
    test('should load survey by id on success', async () => {
      const res = await MongoHelper.insertOne('surveys', mockSurvey());
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

  describe('checkById()', () => {
    test('should return true if survey exists', async () => {
      const res = await MongoHelper.insertOne('surveys', mockSurvey());
      const { id } = await MongoHelper.map(res);
      const sut = makeSut();
      const exists = await sut.checkById(id);
      expect(exists).toBe(true);
    });

    test('should return null when survey does not exists', async () => {
      const sut = makeSut();
      const survey = await sut.loadById('6336e1f27292da6d2d9fc718');
      expect(survey).toBe(null);
    });
  });
});
