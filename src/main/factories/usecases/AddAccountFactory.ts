import { AccountMongoRepository, BcryptAdapter } from '@/infra';
import env from '@/main/config/env';
import { AddAccount } from '@/domain';
import { DbAddAccount } from '@/data';

export const makeAddAccount = (): AddAccount => {
  const hasher = new BcryptAdapter(parseInt(env.salt));
  const addAccountRepository = new AccountMongoRepository();
  return new DbAddAccount(hasher, addAccountRepository, addAccountRepository);
};
