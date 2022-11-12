import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/account/Authentication';

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(authentication: AuthenticationParams): Promise<string> {
      return Promise.resolve('any_token');
    }
  }
  return new AuthenticationStub();
};
