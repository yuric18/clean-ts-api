import { AccountModel } from "../../../domain/entities/Account";

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel>
};
