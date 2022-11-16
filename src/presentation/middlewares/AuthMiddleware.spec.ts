import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers/http/HttpHelper';
import { mockLoadAccountByToken } from '@/presentation/test';
import { AuthMiddleware } from './AuthMiddleware';
import { LoadAccountByToken, HttpRequest } from './AuthMiddlewareProtocols';

const makeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
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
    await sut.handle(makeRequest());
    expect(loadAccountSpy).toHaveBeenCalledWith('any_token', role);
  });

  test('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load').mockResolvedValueOnce(null);
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('should return 500 if LoadAccountByToken returns throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load');
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(ok({ accountId: 'any_id' }));
  });
});
