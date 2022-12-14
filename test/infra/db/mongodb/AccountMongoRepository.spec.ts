import { MongoHelper, AccountMongoRepository } from '@/index';

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

let accountCollection;

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('add', () => {
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
  });

  describe('checkByEmail', () => {
    test('Should return true on checkByEmail if already exists', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      });
      const exists = await sut.checkByEmail('any_email@mail.com');
      expect(exists).toBe(true);
    });

    test('Should return false on checkByEmail if not exists', async () => {
      const sut = makeSut();
      const exists = await sut.checkByEmail('any_email@mail.com');
      expect(exists).toBe(false);
    });
  });

  describe('loadByEmail', () => {
    test('Should return an Account on loadByEmail success', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
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
  });

  describe('loadByToken', () => {
    test('Should return an Account on loadByToken without role success', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
      });
      const account = await sut.loadByToken('any_token');
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });

    test('Should return an Account on loadByToken with admin role', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin',
      });
      const account = await sut.loadByToken('any_token', 'admin');
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });

    test('Should return an Account on loadByToken if user is admin', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin',
      });
      const account = await sut.loadByToken('any_token');
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
      });
      const account = await sut.loadByToken('any_token', 'admin');
      expect(account).toBeFalsy();
    });

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut();
      const account = await sut.loadByToken('any_email@mail.com');
      expect(account).toBeNull();
    });
  });

  describe('updateAccessToken', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut();
      const fakeAccount = await MongoHelper.insertOne('accounts', {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      });
      const newAccount = MongoHelper.map(fakeAccount);
      expect(newAccount.accessToken).toBeFalsy();

      await sut.updateAccessToken(newAccount.id, 'any_token');
      const account = await accountCollection.findOne({
        _id: newAccount.id,
      });
      const updatedTokenAccount = MongoHelper.map(account);

      expect(updatedTokenAccount).toBeTruthy();
      expect(updatedTokenAccount.accessToken).toBe('any_token');
    });
  });
});
