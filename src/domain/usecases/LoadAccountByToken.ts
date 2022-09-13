import { AccountModel } from '../entities/Account';

export interface LoadAccountByToken {
  load(accessToken: string, role?: string): Promise<AccountModel>
}
