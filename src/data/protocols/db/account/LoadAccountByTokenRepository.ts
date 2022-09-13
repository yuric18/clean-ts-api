import { AccountModel } from '../../../usecases/addAccount/DbAddAccountProtocols';

export interface LoadAccountByTokenRepository {
  loadByToken(token: string): Promise<AccountModel>;
}