import { AccountModel } from '@/domain';

export interface LoadAccountByToken {
  load(accessToken: string, role?: string): Promise<LoadAccountByToken.Output>;
}

export namespace LoadAccountByToken {
  export type Output = AccountModel;
}
