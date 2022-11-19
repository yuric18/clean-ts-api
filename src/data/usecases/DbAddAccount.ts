import { AddAccount } from '@/domain';

import {
  AddAccountRepository,
  Hasher,
  LoadAccountByEmailRepository,
} from '@/data';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add(accountData: AddAccount.Input): Promise<AddAccount.Output> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      accountData.email
    );
    if (account) return false;

    const hashedPassword = await this.hasher.hash(accountData.password);
    return !!this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });
  }
}
