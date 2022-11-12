import { AccountModel } from '@/data/usecases/account/addAccount/DbAddAccountProtocols';

export interface LoadAccountByTokenRepository {
  loadByToken(accessToken: string, role?: string): Promise<AccountModel>;
}
