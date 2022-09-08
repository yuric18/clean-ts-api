import {Authentication} from "../../../../domain/usecases/Authentication";
import {
  AccountMongoRepository
} from "../../../../infra/db/mongodb/account/AccountMongoRepository";
import {BcryptAdapter} from "../../../../infra/criptography/bcrypt/BcryptAdapter";
import {JwtAdapter} from "../../../../infra/criptography/jwt/JwtAdapter";
import env from "../../../config/env";
import {DbAuthentication} from "../../../../data/usecases/authentication/DbAuthentication";

export const makeAuthentication = (): Authentication => {
  const accountMongoRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter(parseInt(env.salt));
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
};
