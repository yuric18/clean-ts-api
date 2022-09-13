import { AccountModel } from '../../../usecases/addAccount/DbAddAccountProtocols';

export interface LoadAccountByTokenRepository {
  loadByToken(accessToken: string, role?: string): Promise<AccountModel>;
}