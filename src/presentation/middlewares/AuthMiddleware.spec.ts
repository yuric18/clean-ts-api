import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/HttpHelper';
import { AuthMiddleware } from './AuthMiddleware';
import { AccountModel } from '../../data/usecases/addAccount/DbAddAccountProtocols';
import { LoadAccountByTokenRepository } from '../../data/protocols/db/account/LoadAccountByTokenRepository';

const makeFakeAccount = (): AccountModel => ({
  email: 'any_email@mail.com',
  id: 'any_id',
  name: 'any_name',
  password: 'any_password',
});


const makeLoadAccountByToken = (): LoadAccountByTokenRepository => {
  class LoadAccountByToken implements LoadAccountByTokenRepository {
    loadByToken(token: string): Promise<AccountModel> {
      return Promise.resolve(makeFakeAccount());
    }
  }
  return new LoadAccountByToken();
};

type SutTypes = {
  sut: AuthMiddleware,
  loadAccountByTokenStub: LoadAccountByTokenRepository
};

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub);
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
    const { sut, loadAccountByTokenStub } = makeSut();
    const loadAccountSpy = jest.spyOn(loadAccountByTokenStub, 'loadByToken');
    await sut.handle({
      headers: {
        'x-access-token': 'any_token',
      },
    });
    expect(loadAccountSpy).toHaveBeenCalledWith('any_token');
  });
});