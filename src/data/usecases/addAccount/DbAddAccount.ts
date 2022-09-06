import {
  AddAccountModel,
  AccountModel,
  AddAccount,
  Hasher,
  AddAccountRepository,
} from './DbAddAccountProtocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(account.password);
    return this.addAccountRepository.add(Object.assign(account, { password: hashedPassword }));
  }
}
