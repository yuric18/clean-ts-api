import { AddAccountRepository } from '@/index';

import { mockAccountModel } from 'test/domain';

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(
      data: AddAccountRepository.Input
    ): Promise<AddAccountRepository.Output> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountRepositoryStub();
};
