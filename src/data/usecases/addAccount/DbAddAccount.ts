import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount';
import { AccountModel } from "../../../domain/entities/Account";
import { Encrypter } from "../../protocols/Encrypter";

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(account.password);

    return Promise.resolve(undefined);
  }

}
