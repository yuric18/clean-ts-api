import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/HttpHelper';
import { AuthMiddleware } from './AuthMiddleware';

const makeSut = (): AuthMiddleware => {
  return new AuthMiddleware();
};

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const sut = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
});