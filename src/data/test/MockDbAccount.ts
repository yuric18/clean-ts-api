import { mockAccountModel } from '@/domain/tests';
import { AddAccountRepository } from '@/data/protocols/db/account/AddAccountRepository';
import {
  AddAccountParams,
  AccountModel,
  LoadAccountByEmailRepository,
} from '@/data/usecases/account/addAccount/DbAddAccountProtocols';
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/LoadAccountByTokenRepository';
import { UpdateAccessTokenRepository } from '../protocols/db/account/UpdateAccessTokenRepository';

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(data: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository =
  (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByEmailRepository
    {
      async loadByEmail(): Promise<AccountModel> {
        return Promise.resolve(mockAccountModel());
      }
    }
    return new LoadAccountByEmailRepositoryStub();
  };

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

export const mockUpdateAccessTokenRepository =
  (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub
      implements UpdateAccessTokenRepository
    {
      async updateAccessToken(): Promise<void> {
        return null;
      }
    }
    return new UpdateAccessTokenRepositoryStub();
  };
