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

describe('Surveys Query', () => {
  beforeAll(async () => {
    app = await setupApp();
    await MongoHelper.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountsCollection = MongoHelper.getCollection('accounts');
    await accountsCollection.deleteMany({});
    surveysCollection = MongoHelper.getCollection('surveys');
    await surveysCollection.deleteMany({});
  });

  describe('Surveys Query', () => {
    const query = `query {
      surveys {
        id
        question
        answers {
          answer
          image
        }
        date
        didAnswer
      }
    }`;

    test('Should return 403 on load survey without accessToken', async () => {
      await request(app).post('/graphql').send({ query }).expect(403);
    });

    test('Should return 204 on load surveys with an valid accessToken', async () => {
      const accessToken = await makeAccessToken();
      request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
        .expect(204);
    });
  });

  describe('Surveys Mutation', () => {
    const query = `mutation {
      addSurvey(question: "Question 1", answers: 
        [
          { answer: "Answer 1", image: "image.com" },
          { answer: "Answer 2" }
        ]
      ) {
        id
      }
    }`;

    test('Should return 403 on add survey without accessToken', async () => {
      await request(app).post('/graphql').send({ query }).expect(403);
    });

    test('Should return 204 on add survey with an valid accessToken', async () => {
      const accessToken = await makeAccessToken();
      request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
        .expect(204);
    });
  });
});
