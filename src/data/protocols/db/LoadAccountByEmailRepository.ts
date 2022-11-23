import { AccountModel } from '@/domain';

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Output>;
}

export namespace LoadAccountByEmailRepository {
  export type Output = AccountModel;
}
