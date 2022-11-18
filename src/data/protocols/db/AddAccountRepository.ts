import { AddAccountParams, AccountModel } from '@/domain';

export interface AddAccountRepository {
  add(data: AddAccountParams): Promise<AccountModel>;
}
