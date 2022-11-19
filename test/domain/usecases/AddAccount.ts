import { AddAccount } from '@/index';

export const mockAddAccountInput = (): AddAccount.Input => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccount.Input): Promise<AddAccount.Output> {
      return Promise.resolve(true);
    }
  }
  return new AddAccountStub();
};
