import { LoadAccountByToken } from '@/domain/usecases/account/LoadAccountByToken';
import { DbLoadAccountByToken } from '@/data/usecases/account/loadAccount/DbLoadAccountByToken';
import { AccountMongoRepository } from '@/infra/db/mongodb/account/AccountMongoRepository';
import { JwtAdapter } from '@/infra/criptography/jwt/JwtAdapter';
import env from '../../../../config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository();
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
