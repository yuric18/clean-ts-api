import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Hasher,
  LoadAccountByEmailRepository,
} from './DbAddAccountProtocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email);
    if (account) return null;

    const hashedPassword = await this.hasher.hash(accountData.password);
    return this.addAccountRepository.add(Object.assign(accountData, { password: hashedPassword }));
  }
}