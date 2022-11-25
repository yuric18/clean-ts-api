import { MongoHelper, LogMongoRepository } from '@/index';

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository();
};

let errorCollection;

describe('Log Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
    errorCollection = MongoHelper.getCollection('errors');
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await errorCollection.deleteMany({});
  });

  test('Should create an error log on success', async () => {
    const sut = makeSut();
    await sut.logError('any_error');
    const count = await errorCollection.countDocuments();
    expect(count).toBe(1);
  });
});
