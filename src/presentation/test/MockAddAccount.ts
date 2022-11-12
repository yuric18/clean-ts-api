import { AccountModel } from '@/domain/entities/Account';
import { mockAccountModel } from '@/domain/tests';
import {
  AddAccount,
  AddAccountParams,
} from '@/domain/usecases/account/AddAccount';

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountStub();
};
