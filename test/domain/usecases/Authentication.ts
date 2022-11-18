import {
  Authentication,
  AuthenticationParams,
  AuthenticatedAccountModel,
} from '@/index';

import { mockAuthenticatedAccount } from '../entities/AuthenticatedAccount';

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(
      authentication: AuthenticationParams
    ): Promise<AuthenticatedAccountModel> {
      return Promise.resolve(mockAuthenticatedAccount());
    }
  }
  return new AuthenticationStub();
};
