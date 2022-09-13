import { Decrypter } from '../../protocols/criptography/Decrypter';
import { DbLoadAccountByToken } from './DbLoadAccountByToken';


const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(token: string): Promise<string> {
      return Promise.resolve('');
    }
  }
  return new DecrypterStub();
};

const makeSut = () => {
  const decrypterStub = makeDecrypter();
  const sut = new DbLoadAccountByToken(decrypterStub);
  return {
    sut,
    decrypterStub,
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.loadByToken('any_token');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });
});