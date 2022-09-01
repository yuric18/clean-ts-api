import request from 'supertest';
import app from "../config/app";
import { MongoHelper } from "../../infra/db/mongodb/helpers/MongoHelper";

describe('SignUp Routes', () => {

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

  test('Should return an account on success', async () => {
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
