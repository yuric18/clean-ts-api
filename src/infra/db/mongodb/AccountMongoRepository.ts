import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
} from '@/data';
import { AccountModel, AddAccountParams } from '@/domain';
import { MongoHelper } from './helpers/MongoHelper';

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository
{
  async add(accountData: AddAccountParams): Promise<AccountModel> {
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
    await MongoHelper.collection.updateOne(
      { _id: id },
      {
        $set: { accessToken: token },
      }
    );
  }
}
