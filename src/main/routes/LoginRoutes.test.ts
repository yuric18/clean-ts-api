import request from 'supertest';
import app from "../config/app";
import { MongoHelper } from "../../infra/db/mongodb/helpers/MongoHelper";
import { hash } from 'bcrypt';

describe('Login Routes', () => {

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.getCollection('accounts')
    await MongoHelper.collection.deleteMany({});
  });

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Yuri',
          email: 'y.cabral18@hotmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200);
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12);
      await MongoHelper.insert({
        name: 'Yuri',
        email: 'y.cabral18@mail.com',
        password: password
      });
      await request(app)
        .post('/api/login')
        .send({
          email: 'y.cabral18@mail.com',
          password: '123',
        })
        .expect(200);
    })
  })
})
