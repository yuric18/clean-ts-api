import { Authentication, AuthenticationModel } from "../../../domain/usecases/Authentication";
import { LoadAccountByEmailRepository } from "../../protocols/db/LoadAccountByEmailRepository";
import { AccountModel } from "../addAccount/DbAddAccountProtocols";
import { DbAuthentication } from "./DbAuthentication";

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
});

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

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
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub();
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
};

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    await sut.auth(makeFakeAuthentication());
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockRejectedValueOnce(new Error());
    const promise = sut.auth(makeFakeAuthentication());
    expect(promise).rejects.toThrow();
  });
});