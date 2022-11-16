import { mockAuthenticatedAccount } from '@/domain/tests';
import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/account/Authentication';
import { AuthenticatedAccountModel } from '../middlewares/AuthMiddlewareProtocols';

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
