import { AuthenticatedAccountModel } from '@/index';

export const mockAuthenticatedAccount = (): AuthenticatedAccountModel => ({
  name: 'any_name',
  accessToken: 'any_token',
});
