import { MongoHelper } from '../helpers/MongoHelper';
import {LogMongoRepository} from "./Log";

describe('Log Mongo Repository', () => {

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.getCollection('errors')
    await MongoHelper.collection.deleteMany({});
  });

  const makeSut = (): LogMongoRepository => {
    return new LogMongoRepository();
  };

  test('Should create an error log on success', async () => {
    const sut = makeSut();
    await sut.logError('any_error');
    const count = await MongoHelper.collection.countDocuments();
    expect(count).toBe(1);
  })
});
