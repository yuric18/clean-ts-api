import {
  mockEncrypter,
  mockHashComparer,
  mockLoadAccountByEmailRepository,
  mockUpdateAccessTokenRepository,
} from '@/data/test';
import { mockAuthentication } from '@/domain/tests';
import { DbAuthentication } from './DbAuthentication';
import {
  Authentication,
  HashComparer,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  Encrypter,
} from './DbAuthenticationProtocols';

type SutTypes = {
  sut: Authentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashComparerStub: HashComparer;
  encrypterStub: Encrypter;
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository;
};

const makeSut = (): SutTypes => {
  const hashComparerStub = mockHashComparer();
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
  const encrypterStub = mockEncrypter();
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  );
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
  };
};

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
    await sut.auth(mockAuthentication());
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throw if LoadAccountByEmailRepository throws', () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockRejectedValueOnce(new Error());
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow();
  });

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(null);
    const accessToken = await sut.auth(mockAuthentication());
    expect(accessToken).toBeNull();
  });

  test('Should call HashComparer with correct password', async () => {
    const { sut, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, 'compare');
    await sut.auth(mockAuthentication());
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password');
  });

  test('Should throw if HashComparer throws', () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error());
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow();
  });

  test('Should return null if HashCompare returns false', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false);
    const accessToken = await sut.auth(mockAuthentication());
    expect(accessToken).toBeNull();
  });

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut();
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.auth(mockAuthentication());
    expect(generateSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should throw if Encrypter throws', () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error());
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new Error());
  });

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(
      updateAccessTokenRepositoryStub,
      'updateAccessToken'
    );
    await sut.auth(mockAuthentication());
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token');
  });

  test('Should throw if UpdateAccessTokenRepository throws', () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    jest
      .spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
      .mockRejectedValueOnce(new Error());
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new Error());
  });

  test('Should return generated token if success', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(mockAuthentication());
    expect(accessToken).toBe('any_token');
  });
});
