import { MongoHelper } from '@/index';
import app from '@/main/config/app';
import env from '@/main/config/env';
import { sign } from 'jsonwebtoken';
import request from 'supertest';

const makeAccessToken = async (): Promise<string> => {
  await MongoHelper.getCollection('accounts');
  const { id } = MongoHelper.map(
    await MongoHelper.insert({
      name: 'Yuri',
      email: 'yuri.cabral@gmail.com',
      password: '123',
      role: 'admin',
    })
  );
  const accessToken = sign({ id }, env.jwtSecret);
  await MongoHelper.collection.updateOne(
    { _id: id },
    {
      $set: { accessToken },
    }
  );

  return accessToken;
};

describe('Survey Routes', () => {
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

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(403);
    });

    test('Should return 204 on add survey with an valid accessToken', async () => {
      const accessToken = await makeAccessToken();
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(204);
    });
  });

  describe('GET /surveys', () => {
    test('Should return 403 on load survey without accessToken', async () => {
      await request(app).get('/api/surveys').expect(403);
    });

    test('Should return 204 on load surveys with an valid accessToken', async () => {
      const accessToken = await makeAccessToken();
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204);
    });
  });
});
