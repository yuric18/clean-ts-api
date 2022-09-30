import env from '../config/env';
import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelper';
import { sign } from 'jsonwebtoken';

const makeAccessToken = async (): Promise<string> => {
  await MongoHelper.getCollection('accounts');
  const { id } = MongoHelper.map(await MongoHelper.insert({
    name: 'Yuri',
    email: 'yuri.cabral@gmail.com',
    password: '123',
  }));
  const accessToken = sign({ id }, env.jwtSecret);
  await MongoHelper.collection.updateOne({ _id: id }, {
    $set: { accessToken },
  });

  return accessToken;
};

describe('Survey Result Routes', () => {

  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.getCollection('surveys');
    await MongoHelper.collection.deleteMany({});
    await MongoHelper.getCollection('accounts');
    await MongoHelper.collection.deleteMany({});
  });

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer',
        })
        .expect(403);
    });

    test('Should return 200 on save survey result with an valid accessToken', async () => {
      await MongoHelper.getCollection('surveys');
      const data = await MongoHelper.insert({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com',
        }],
        date: new Date(),
      });
      const survey = MongoHelper.map(data);

      const accessToken = await makeAccessToken();
      await request(app)
        .put(`/api/surveys/${survey.id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1',
        })
        .expect(200);
    });
  });
});