import { AccountModel } from '@/domain';

export interface LoadAccountByTokenRepository {
  loadByToken(accessToken: string, role?: string): Promise<AccountModel>;
}
