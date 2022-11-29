import { MongoHelper } from '@/index';
import { setupApp } from '@/main/config/app';
import env from '@/main/config/env';
import { Express } from 'express';
import { sign } from 'jsonwebtoken';
import request from 'supertest';

let surveysCollection;
let accountsCollection;

let app: Express;

const makeAccessToken = async (): Promise<string> => {
  const { id } = MongoHelper.map(
    await MongoHelper.insertOne('accounts', {
      name: 'Yuri',
      email: 'yuri.cabral@gmail.com',
      password: '123',
      role: 'admin',
    })
  );
  const accessToken = sign({ id }, env.jwtSecret);
  await accountsCollection.updateOne(
    { _id: id },
    {
      $set: { accessToken },
    }
  );

  return accessToken;
};

describe('Survey Result Routes', () => {
  beforeAll(async () => {
    app = await setupApp();
    await MongoHelper.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveysCollection = MongoHelper.getCollection('surveys');
    await surveysCollection.deleteMany({});
    accountsCollection = MongoHelper.getCollection('accounts');
    await accountsCollection.deleteMany({});
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
      const data = await MongoHelper.insertOne('surveys', {
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
        ],
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

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on load survey result without accessToken', async () => {
      await request(app).get('/api/surveys/any_id/results').expect(403);
    });

    test('Should return 200 on load survey result with an valid accessToken', async () => {
      const data = await MongoHelper.insertOne('surveys', {
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
        ],
        date: new Date(),
      });
      const survey = MongoHelper.map(data);

      const accessToken = await makeAccessToken();
      await request(app)
        .get(`/api/surveys/${survey.id}/results`)
        .set('x-access-token', accessToken)
        .expect(200);
    });
  });
});
