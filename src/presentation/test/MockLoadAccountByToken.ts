import { AccountModel } from '@/domain/entities/Account';
import { mockAccountModel } from '@/domain/tests';
import { LoadAccountByToken } from '@/domain/usecases/account/LoadAccountByToken';

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    load(token: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountByTokenStub();
};
