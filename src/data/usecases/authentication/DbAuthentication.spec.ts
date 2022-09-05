import { Authentication, AuthenticationModel } from "../../../domain/usecases/Authentication";
import { HashComparer } from "../../protocols/criptography/HashComparer";
import { LoadAccountByEmailRepository } from "../../protocols/db/LoadAccountByEmailRepository";
import { AccountModel } from "../addAccount/DbAddAccountProtocols";
import { DbAuthentication } from "./DbAuthentication";
import {TokenGenerator} from "../../protocols/criptography/TokenGenerator";

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
});

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeHashComparerStub = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(hash: string, otherHash: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  };
  return new HashComparerStub();
};

const makeTokenGeneratorStub = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate(id: string): Promise<string> {
      return Promise.resolve('any_token');
    }
  };
  return new TokenGeneratorStub();
};

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      return Promise.resolve(makeFakeAccount());
    }
  };
  return new LoadAccountByEmailRepositoryStub();
};

type SutTypes = {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  tokenGeneratorStub: TokenGenerator
}

const makeSut = (): SutTypes => {
  const hashComparerStub = makeHashComparerStub();
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub();
  const tokenGeneratorStub = makeTokenGeneratorStub();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub
  );
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub
  }
};

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    await sut.auth(makeFakeAuthentication());
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throw if LoadAccountByEmailRepository throws', () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockRejectedValueOnce(new Error());
    const promise = sut.auth(makeFakeAuthentication());
    expect(promise).rejects.toThrow();
  });

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(null);
    const accessToken = await sut.auth(makeFakeAuthentication());
    expect(accessToken).toBeNull();
  });

  test('Should call HashComparer with correct password', async () => {
    const { sut, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAuthentication());
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password');
  });

  test('Should throw if HashComparer throws', () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, 'compare')
      .mockRejectedValueOnce(new Error());
    const promise = sut.auth(makeFakeAuthentication());
    expect(promise).rejects.toThrow();
  });

  test('Should return null if HashCompare returns false', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, 'compare')
      .mockResolvedValueOnce(false);
    const accessToken = await sut.auth(makeFakeAuthentication());
    expect(accessToken).toBeNull();
  });

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut();
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeFakeAuthentication());
    expect(generateSpy).toHaveBeenCalledWith('any_id');
  });
});
