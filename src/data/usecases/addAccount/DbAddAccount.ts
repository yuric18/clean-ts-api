import {
  AddAccountModel,
  AccountModel,
  AddAccount,
  Encrypter,
  AddAccountRepository
} from './DbAddAccountProtocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password);
    await this.addAccountRepository.add(Object.assign(account, { password: hashedPassword }));
    return Promise.resolve(undefined);
  }

}
