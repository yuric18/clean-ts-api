import bcrypt from 'bcrypt';
import { BcryptAdapter } from '@/index';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hashed_value');
  },
  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('Bcrypt Adapter', () => {
  describe('Hash', () => {
    test('Should call bcrypt with correct value', async () => {
      const sut = makeSut();
      const hashSpy = jest.spyOn(bcrypt, 'hash');
      await sut.hash('any_value');
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    test('Should return a hash on success', async () => {
      const sut = makeSut();
      const hash = await sut.hash('any_value');
      expect(hash).toBe('hashed_value');
    });

    test('Should throw if bcrypt throws', async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.hash('any_value');
      await expect(promise).rejects.toThrow();
    });
  });

  describe('Compare', () => {
    test('Should call bcrypt with correct value', async () => {
      const sut = makeSut();
      const compareSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any_value', 'any_other_value');
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_other_value');
    });

    test('Should return true on success', async () => {
      const sut = makeSut();
      const result = await sut.compare('any_value', 'any_other_value');
      expect(result).toBeTruthy();
    });

    test('Should return false when compare fails', async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        return false;
      });
      const result = await sut.compare('any_value', 'any_other_value');
      expect(result).toBeFalsy();
    });

    test('Should throw if bcrypt throws', async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.compare('any_value', 'any_other_value');
      await expect(promise).rejects.toThrow();
    });
  });
});
