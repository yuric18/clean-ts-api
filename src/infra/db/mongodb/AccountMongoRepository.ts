import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
} from '@/data';
import { AccountModel } from '@/domain';
import { MongoHelper } from './helpers/MongoHelper';

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository
{
  async add(
    accountData: AddAccountRepository.Input
  ): Promise<AddAccountRepository.Output> {
    const account = await MongoHelper.insertOne('accounts', accountData);
    return MongoHelper.map(account);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const collection = MongoHelper.getCollection('accounts');
    const account = await collection.findOne({ email });
    return account && MongoHelper.map(account);
  }

  async loadByToken(
    accessToken: string,
    role?: string
  ): Promise<LoadAccountByTokenRepository.Output> {
    const collection = MongoHelper.getCollection('accounts');
    const account = await collection.findOne({
      accessToken,
      role: { $in: [role, 'admin'] },
    });
    return account && MongoHelper.map(account);
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const collection = MongoHelper.getCollection('accounts');
    await collection.updateOne(
      { _id: id },
      {
        $set: { accessToken: token },
      }
    );
  }
}
