import {
  AuthMiddleware,
  LoadAccountByToken,
  forbidden,
  AccessDeniedError,
  serverError,
  ok,
} from '@/index';

import { mockLoadAccountByToken } from 'test/domain';

const makeInput = (): AuthMiddleware.Input => ({
  accessToken: 'any_token',
});

type SutTypes = {
  sut: AuthMiddleware;
  loadAccountByTokenStub: LoadAccountByToken;
};

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub, role);
  return {
    sut,
    loadAccountByTokenStub,
  };
};

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role';
    const { sut, loadAccountByTokenStub } = makeSut(role);
    const loadAccountSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    await sut.handle(makeInput());
    expect(loadAccountSpy).toHaveBeenCalledWith('any_token', role);
  });

  test('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load').mockResolvedValueOnce(null);
    const httpResponse = await sut.handle(makeInput());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('should return 500 if LoadAccountByToken returns throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(makeInput());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load');
    const httpResponse = await sut.handle(makeInput());
    expect(httpResponse).toEqual(ok({ accountId: 'any_id' }));
  });
});
