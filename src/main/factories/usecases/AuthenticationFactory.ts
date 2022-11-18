import { DbAuthentication } from '@/data';
import { Authentication } from '@/domain';
import { AccountMongoRepository, BcryptAdapter, JwtAdapter } from '@/infra';
import env from '@/main/config/env';

export const makeAuthentication = (): Authentication => {
  const accountMongoRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter(parseInt(env.salt));
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  );
};
