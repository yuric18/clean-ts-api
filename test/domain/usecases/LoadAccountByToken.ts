import { LoadAccountByToken, AccountModel } from '@/index';

import { mockAccountModel } from '../entities/Account';

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    load(token: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountByTokenStub();
};
