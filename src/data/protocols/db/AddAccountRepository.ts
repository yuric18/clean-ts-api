import { AccountModel, AddAccount } from '@/domain';

export interface AddAccountRepository {
  add(data: AddAccountRepository.Input): Promise<AddAccountRepository.Output>;
}

export namespace AddAccountRepository {
  export type Input = AddAccount.Input;
  export type Output = AccountModel;
}
