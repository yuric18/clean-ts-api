import {Encrypter} from "../../protocols/Encrypter";
import {DbAddAccount} from "./DbAddAccount";

describe('DbAccount Usecase', () => {
  test('Should call Encrypter with correct password', () => {
    class EncrypterStub implements Encrypter {
      async encrypt(value: string): Promise<string> {
        return Promise.resolve('hashed_password');
      }
    }
    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccount(encrypterStub);
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  })
});
