import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository
} from '../../../../data/usecases/addAccount/DbAddAccountProtocols';
import { MongoHelper } from '../helpers/MongoHelper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    await MongoHelper.getCollection('accounts');
    return await MongoHelper.insert<AddAccountModel>(accountData);
  }
}
