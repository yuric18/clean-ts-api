import {Encrypter} from "../../protocols/Encrypter";
import {DbAddAccount} from "./DbAddAccount";

type SutTypes = {
  sut: DbAddAccount,
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }
  return new EncrypterStub();
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);
  return {
    sut,
    encrypterStub
  }
}

describe('DbAccount Usecase', () => {
  test('Should call Encrypter with correct password', () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  })

  test('Should throw if Encrypter throws', () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error());
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const promise = sut.add(accountData);
    expect(promise).rejects.toThrow();
  })
});
