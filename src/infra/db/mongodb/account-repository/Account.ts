import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository
} from '../../../../data/usecases/addAccount/DbAddAccountProtocols';
import { MongoHelper } from '../helpers/MongoHelper';
import {
  LoadAccountByEmailRepository
} from "../../../../data/protocols/db/LoadAccountByEmailRepository";

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    await MongoHelper.getCollection('accounts');
    const account = await MongoHelper.insert<AddAccountModel>(accountData);
    return MongoHelper.map(account);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    await MongoHelper.getCollection('accounts');
    const account = await MongoHelper.collection.findOne({ email });
    return account && MongoHelper.map(account);
  }
}
