import request from 'supertest';
import app from "../config/app";
import { MongoHelper } from "../../infra/db/mongodb/helpers/MongoHelper";

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
})
