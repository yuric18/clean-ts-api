import { AccountModel } from '@/domain';

export interface LoadAccountByTokenRepository {
  loadByToken(
    accessToken: string,
    role?: string
  ): Promise<LoadAccountByTokenRepository.Output>;
}

export namespace LoadAccountByTokenRepository {
  export type Output = AccountModel;
}
