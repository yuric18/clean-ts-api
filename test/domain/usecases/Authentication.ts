import { Authentication } from '@/index';

import { mockAuthenticatedAccount } from '../entities/AuthenticatedAccount';

export const mockAuthenticationInput = (): Authentication.Input => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(
      authentication: Authentication.Input
    ): Promise<Authentication.Output> {
      return Promise.resolve(mockAuthenticatedAccount());
    }
  }
  return new AuthenticationStub();
};
