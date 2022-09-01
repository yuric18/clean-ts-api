import { DbAddAccount } from "./DbAddAccount";
import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Encrypter
} from './DbAddAccountProtocols';

type SutTypes = {
  sut: DbAddAccount,
  encrypterStub: Encrypter,
  addAccountRepositoryStub: AddAccountRepository
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }
  return new EncrypterStub();
}

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
});

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
});

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepository implements AddAccountRepository {
    async add(data: AddAccountModel): Promise<AccountModel> {
      return Promise.resolve(makeFakeAccount());
    }
  }
  return new AddAccountRepository();
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAccount Usecase', () => {
  test('Should call Encrypter with correct password', () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    sut.add(makeFakeAccountData());
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  })

  test('Should throw if Encrypter throws', () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error());
    const promise = sut.add(makeFakeAccountData());
    expect(promise).rejects.toThrow();
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = makeFakeAccountData();
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      name: accountData.name,
      email: accountData.email,
      password: 'hashed_password'
    });
  })

  test('Should throw if AddAccountPassword throws', () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error());
    const promise = sut.add(makeFakeAccountData());
    expect(promise).rejects.toThrow();
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut } = makeSut();
    const account = await sut.add(makeFakeAccountData());
    expect(account).toEqual(makeFakeAccount());
  })
});
