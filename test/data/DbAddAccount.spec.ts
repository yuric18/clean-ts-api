import {
  DbAddAccount,
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository,
} from '@/index';

import { mockAddAccountInput, mockAccountModel } from 'test/domain';
import {
  mockHasher,
  mockAddAccountRepository,
  mockLoadAccountByEmailRepository,
} from 'test/data';

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher();
  const addAccountRepositoryStub = mockAddAccountRepository();
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
  jest
    .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    .mockResolvedValue(null);
  const sut = new DbAddAccount(
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  );
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbAccount Usecase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
    await sut.add(mockAddAccountInput());
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should return false if LoadAccountByEmailRepositoryStub returns something', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockResolvedValueOnce(mockAccountModel());
    const success = await sut.add(mockAddAccountInput());
    expect(success).toBe(false);
  });

  test('Should throw if LoadAccountByEmailRepository throws', () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const promise = sut.add(mockAddAccountInput());
    expect(promise).rejects.toThrow();
  });

  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hasherSpy = jest.spyOn(hasherStub, 'hash');
    await sut.add(mockAddAccountInput());
    expect(hasherSpy).toHaveBeenCalledWith('any_password');
  });

  test('Should throw if Hasher throws', () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.add(mockAddAccountInput());
    expect(promise).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = mockAddAccountInput();
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      name: accountData.name,
      email: accountData.email,
      password: 'any_password',
    });
  });

  test('Should throw if AddAccountPassword throws', () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.add(mockAddAccountInput());
    expect(promise).rejects.toThrow();
  });

  test('Should return true on success', async () => {
    const { sut } = makeSut();
    const success = await sut.add(mockAddAccountInput());
    expect(success).toBe(true);
  });
});
