import { MongoHelper } from '../helpers/MongoHelper';
import { AccountMongoRepository } from './AccountMongoRepository';

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

describe('Account Mongo Repository', () => {

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.getCollection('accounts');
    await MongoHelper.collection.deleteMany({});
  });

  test('Should return an account on add success', async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
  });

  test('Should return an Account on loadByEmail success', async () => {
    const sut = makeSut();
    await MongoHelper.collection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    const account = await sut.loadByEmail('any_email@mail.com');
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
  });

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut();
    const account = await sut.loadByEmail('any_email@mail.com');
    expect(account).toBeNull();
  });

  test('Should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut();
    const fakeAccount = await MongoHelper.insert({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    const newAccount = MongoHelper.map(fakeAccount);
    expect(newAccount.accessToken).toBeFalsy();
    await sut.updateAccessToken(newAccount.id, 'any_token');
    const account = await MongoHelper.collection.findOne({ _id: newAccount.id });
    const updatedTokenAccount = MongoHelper.map(account);
    expect(updatedTokenAccount).toBeTruthy();
    expect(updatedTokenAccount.accessToken).toBe('any_token');
  });
});
