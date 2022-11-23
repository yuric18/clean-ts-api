import {
  DbAddAccount,
  Hasher,
  AddAccountRepository,
  CheckAccountByEmailRepository,
} from '@/index';

import { mockAddAccountInput, mockAccountModel } from 'test/domain';
import {
  mockHasher,
  mockAddAccountRepository,
  mockCheckAccountByEmailRepository,
} from 'test/data';

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  checkAccountByEmailRepositoryStub: CheckAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher();
  const addAccountRepositoryStub = mockAddAccountRepository();
  const checkAccountByEmailRepositoryStub = mockCheckAccountByEmailRepository();
  const sut = new DbAddAccount(
    hasherStub,
    addAccountRepositoryStub,
    checkAccountByEmailRepositoryStub
  );
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    checkAccountByEmailRepositoryStub,
  };
};

describe('DbAccount Usecase', () => {
  test('Should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut();
    const checkSpy = jest.spyOn(
      checkAccountByEmailRepositoryStub,
      'checkByEmail'
    );
    await sut.add(mockAddAccountInput());
    expect(checkSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should return false if CheckAccountByEmailRepositoryStub returns something', async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail')
      .mockResolvedValueOnce(true);
    const success = await sut.add(mockAddAccountInput());
    expect(success).toBe(false);
  });

  test('Should throw if CheckAccountByEmailRepository throws', () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail')
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
