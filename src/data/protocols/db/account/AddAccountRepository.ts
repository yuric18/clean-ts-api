import { AddAccountParams } from '@/domain/usecases/account/AddAccount';
import { AccountModel } from '@/domain/entities/Account';

export interface AddAccountRepository {
  add(data: AddAccountParams): Promise<AccountModel>;
}
