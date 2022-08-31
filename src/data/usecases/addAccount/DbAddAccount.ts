import { AddAccountModel, AccountModel, AddAccount, Encrypter } from './DbAddAccountProtocols';

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(account.password);

    return Promise.resolve(undefined);
  }

}
