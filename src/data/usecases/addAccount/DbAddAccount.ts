import {
  AddAccountModel,
  AccountModel,
  AddAccount,
  Hasher,
  AddAccountRepository,
} from './DbAddAccountProtocols';
import {
  LoadAccountByEmailRepository
} from "../../protocols/db/account/LoadAccountByEmailRepository";

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(account.password);
    const hasAccount = await this.loadAccountByEmailRepository.loadByEmail(account.email);
    return this.addAccountRepository.add(Object.assign(account, { password: hashedPassword }));
  }
}
