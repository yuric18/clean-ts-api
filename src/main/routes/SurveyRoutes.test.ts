import env from '../config/env';
import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/MongoHelper';
import { sign } from 'jsonwebtoken';

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
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com',
          }, {
            answer: 'Answer 2',
          }],
        })
        .expect(403);
    });

    test('Should return 204 on add survey with an valid accessToken', async () => {
      await MongoHelper.getCollection('accounts');
      const { id } = MongoHelper.map(await MongoHelper.insert({
        name: 'Yuri',
        email: 'yuri.cabral@gmail.com',
        password: '123',
        role: 'admin',
      }));
      const accessToken = sign({ id }, env.jwtSecret);
      await MongoHelper.collection.updateOne({ _id: id }, {
        $set: { accessToken },
      });

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com',
          }, {
            answer: 'Answer 2',
          }],
        })
        .expect(204);
    });
  });
});
