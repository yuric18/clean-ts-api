import { MongoHelper } from '@/index';
import { setupApp } from '@/main/config/app';
import env from '@/main/config/env';
import { hash } from 'bcrypt';
import { Express } from 'express';
import request from 'supertest';

let accountsCollection;
let app: Express;

describe('Login Routes', () => {
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
  });

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Yuri',
          email: 'y.cabral18@hotmail.com',
          password: '123',
          passwordConfirmation: '123',
        })
        .expect(200);
    });
  });

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12);
      await MongoHelper.insertOne('accounts', {
        name: 'Yuri',
        email: 'y.cabral18@mail.com',
        password: password,
      });
      await request(app)
        .post('/api/login')
        .send({
          email: 'y.cabral18@mail.com',
          password: '123',
        })
        .expect(200);
    });

    test('Should return 401 when login not authorized', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'y.cabral18@mail.com',
          password: '123',
        })
        .expect(401);
    });

    test('Should return 401 when login not authorized', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'y.cabral18@mail.com',
          password: '123',
        })
        .expect(401);
    });
  });
});
