import { LoadAccountByTokenRepository, AccountModel } from '@/index';

import { mockAccountModel } from 'test/domain';

export const mockLoadAccountByTokenRepository =
  (): LoadAccountByTokenRepository => {
    class LoadAccountByTokenRepositoryStub
      implements LoadAccountByTokenRepository
    {
      async loadByToken(
        token: string,
        role?: string | undefined
      ): Promise<AccountModel> {
        return Promise.resolve(mockAccountModel());
      }
    }
    return new LoadAccountByTokenRepositoryStub();
  };
