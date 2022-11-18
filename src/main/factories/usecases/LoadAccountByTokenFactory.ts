import { LoadAccountByToken } from '@/domain';
import { DbLoadAccountByToken } from '@/data';
import { AccountMongoRepository, JwtAdapter } from '@/infra';
import env from '@/main/config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository();
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
