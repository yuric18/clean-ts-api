import jwt from 'jsonwebtoken';
import { JwtAdapter } from './JwtAdapter';

jest.mock('jsonwebtoken', () => ({
  sign(): Promise<string> {
    return Promise.resolve('any_token');
  },
  verify(): Promise<string> {
    return Promise.resolve('any_value');
  },
}));

type SutTypes = {
  sut: JwtAdapter
};

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret');
  return {
    sut,
  };
};

describe('JWT Adapter', () => {
  describe('Encrypt', () => {
    test('Should call sign with correct values', async () => {
      const { sut } = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');
      await sut.encrypt('any_id');
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
    });
  
    test('Should return a token on sign success', async () => {
      const { sut } = makeSut();
      const accessToken = await sut.encrypt('any_id');
      expect(accessToken).toBe('any_token');
    });

    test('Should throw if sign throws', () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'sign')
        .mockImplementationOnce(() => { throw new Error(); });
      const promise = sut.encrypt('any_id');
      expect(promise).rejects.toThrow();
    });
  });

  describe('Decrypt', () => {
    test('Should call decrypt with correct values', async () => {
      const { sut } = makeSut();
      const verifySpy = jest.spyOn(jwt, 'verify');
      await sut.decrypt('any_token');
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret');
    });
  });
});
