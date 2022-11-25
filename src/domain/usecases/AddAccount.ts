import { AccountModel } from '@/domain';

export interface AddAccount {
  add(account: AddAccount.Input): Promise<AddAccount.Output>;
}

export namespace AddAccount {
  export type Input = Omit<AccountModel, 'id'>;
  export type Output = boolean;
}
