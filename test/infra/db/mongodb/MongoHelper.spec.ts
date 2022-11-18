import { MongoHelper as sut } from '@/index';

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('should reconnect if mongodb is down', async () => {
    await sut.getCollection('account');
    expect(sut.collection).toBeTruthy();
    await sut.disconnect();
    await sut.getCollection('account');
    expect(sut.collection).toBeTruthy();
  });
});
