import MockDate from 'mockdate';
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
  date: new Date(),
});

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
      const addResult = await sut.add(makeFakeSurvey());
      const survey = await MongoHelper.collection.findOne({ question: 'any_question' });
      expect(addResult).toBeNull();
      expect(survey).toBeTruthy();
    });
  });

  describe('loadAll()', () => {
    test('should load all surveys on success', async () => {
      await MongoHelper.collection.insertMany([
        makeFakeSurvey(),
        makeFakeSurvey(),
      ]);
      const sut = makeSut();
      const surveys = await sut.loadAll();
      expect(surveys.length).toBe(2);
    });

    test('should return empty list when no content', async () => {
      const sut = makeSut();
      const surveys = await sut.loadAll();
      expect(surveys.length).toBe(0);
    });
  });

  describe('loadById()', () => {
    test('should load survey by id on success', async () => {
      const res = await MongoHelper.insert(makeFakeSurvey());
      const { id } = await MongoHelper.map(res);
      const sut = makeSut();
      const survey = await sut.loadById(id);
      expect(survey).toBeTruthy();
    });

    test('should return empty list when no content', async () => {
      const sut = makeSut();
      const survey = await sut.loadById('any_id');
      expect(survey).toBeNull();
    });
  });
});