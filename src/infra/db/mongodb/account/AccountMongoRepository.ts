import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
} from '@/data/usecases/account/addAccount/DbAddAccountProtocols';
import { MongoHelper } from '../helpers/MongoHelper';
import {
  LoadAccountByEmailRepository,
} from '@/data/protocols/db/account/LoadAccountByEmailRepository';
import {
  UpdateAccessTokenRepository,
} from '@/data/protocols/db/account/UpdateAccessTokenRepository';
import { LoadAccountByTokenRepository } from '@/presentation/middlewares/AuthMiddlewareProtocols';

export class AccountMongoRepository implements
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository {

    
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    await MongoHelper.getCollection('accounts');
    const account = await MongoHelper.insert(accountData);
    return MongoHelper.map(account);
  }
    
  async loadByEmail(email: string): Promise<AccountModel> {
    await MongoHelper.getCollection('accounts');
    const account = await MongoHelper.collection.findOne({ email });
    return account && MongoHelper.map(account);
  }
    
  async loadByToken(accessToken: string, role?: string): Promise<AccountModel> {
    await MongoHelper.getCollection('accounts');
    const account = await MongoHelper.collection.findOne({ 
      accessToken,
      role: { $in: [role, 'admin'] },
    });
    return account && MongoHelper.map(account);
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    await MongoHelper.getCollection('accounts');
    await MongoHelper.collection.updateOne({ _id: id }, {
      $set: { accessToken: token },
    });
  }
}
