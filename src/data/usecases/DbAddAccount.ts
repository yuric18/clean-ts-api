import { AddAccount } from '@/domain';

import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  Hasher,
} from '@/data';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add(accountData: AddAccount.Input): Promise<AddAccount.Output> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(
      accountData.email
    );
    if (exists) return false;

    const hashedPassword = await this.hasher.hash(accountData.password);
    return !!this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });
  }
}
