import {
  LoadAccountByTokenRepository,
  Decrypter,
} from './DbLoadAccountByTokenProtocols';
import { DbLoadAccountByToken } from './DbLoadAccountByToken';
import { mockAccountModel } from '@/domain/tests';
import { mockDecrypter, mockLoadAccountByTokenRepository } from '@/data/test';

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository();
  const decrypterStub = mockDecrypter();
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositoryStub
  );
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token', 'any_role');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  test('Should return null if Decrypter return null', async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(null);
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBe(null);
  });

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const decryptSpy = jest.spyOn(
      loadAccountByTokenRepositoryStub,
      'loadByToken'
    );
    await sut.load('any_token', 'any_role');
    expect(decryptSpy).toHaveBeenCalledWith('any_token', 'any_role');
  });

  test('Should return null if LoadAccountByTokenRepository return null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockResolvedValueOnce(null);
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBe(null);
  });

  test('should throw if LoadAccountByToken throws', () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockRejectedValueOnce(new Error());
    const promise = sut.load('any_token', 'any_role');
    expect(promise).rejects.toThrow();
  });

  test('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.load('any_token', 'any_role');
    expect(account).toEqual(mockAccountModel());
  });
});
