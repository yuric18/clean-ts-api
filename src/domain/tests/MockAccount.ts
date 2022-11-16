import { AccountModel, AuthenticatedAccountModel } from '../entities/Account';
import { AddAccountParams } from '../usecases/account/AddAccount';
import { AuthenticationParams } from '../usecases/account/Authentication';

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAuthenticatedAccount = (): AuthenticatedAccountModel => ({
  name: 'any_name',
  accessToken: 'any_token',
});

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});
