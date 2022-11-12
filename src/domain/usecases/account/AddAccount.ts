import { AccountModel } from '../../entities/Account';

export type AddAccountParams = Omit<AccountModel, 'id'>;

export interface AddAccount {
  add(account: AddAccountParams): Promise<AccountModel>;
}
