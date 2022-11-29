import { MongoHelper } from '@/index';
import { setupApp } from '@/main/config/app';
import env from '@/main/config/env';
import { gql } from 'apollo-server-express';
import { hash } from 'bcrypt';
import { Express } from 'express';
import request from 'supertest';

let accountsCollection;
let app: Express;

describe('Login GraphQL', () => {
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
    const query = `mutation {
      signUp (name: "Yuri", email: "y.cabral18@mail.com", password: "123", passwordConfirmation: "123") {
        accessToken
        name
      }
    }`;

    test('Should return 200 on signup', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({ query })
        .expect(200);
      expect(res.body.data.signUp.accessToken).toBeTruthy();
      expect(res.body.data.signUp.name).toBe('Yuri');
    });

    test('Should return EmailInUseError on invalid data', async () => {
      const password = await hash('123', 12);
      await accountsCollection.insertOne({
        name: 'Yuri',
        email: 'y.cabral18@mail.com',
        password,
      });
      const res = await request(app).post('/graphql').send({ query });
      expect(res.status).toBe(403);
      expect(res.body.data).toBeFalsy();
      expect(res.body.errors[0].message).toBe('E-mail already exists');
    });
  });

  describe('POST /login', () => {
    const query = `
      query {
        login (email: "y.cabral18@mail.com", password: "123") {
          accessToken
          name
        }
      }
    `;

    test('Should return 200 on login', async () => {
      const password = await hash('123', 12);
      await MongoHelper.insertOne('accounts', {
        name: 'Yuri',
        email: 'y.cabral18@mail.com',
        password: password,
      });
      await request(app).post('/graphql').send({ query }).expect(200);
    });

    test('Should return 401 when login not authorized', async () => {
      await request(app).post('/graphql').send({ query }).expect(401);
    });
  });
});
