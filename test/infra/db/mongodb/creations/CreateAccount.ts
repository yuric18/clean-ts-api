import { MongoHelper } from '@/index';
import { Collection } from 'mongodb';

export const createAccount = async (
  accountCollection: Collection,
  returnObject: boolean
) => {
  const result = accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    accessToken: 'any_token',
    role: 'admin',
  });

  return returnObject ? MongoHelper.map(result) : null;
};
