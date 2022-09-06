import env from '../../config/env';
import { Controller } from '../../../presentation/protocols';
import { LoginController } from '../../../presentation/controllers/login/LoginController';
import { LogControllerDecorator } from '../../decorators/LogControllerDecorator';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/LogMongoRepository';
import { makeLoginValidation } from './LoginValidationFactory';
import { DbAuthentication } from '../../../data/usecases/authentication/DbAuthentication';
import {
  AccountMongoRepository,
} from '../../../infra/db/mongodb/account/AccountMongoRepository';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/BcryptAdapter';
import { JwtAdapter } from '../../../infra/criptography/jwt/JwtAdapter';

export const makeLoginController = (): Controller => {
  const salt = 12;
  const accountMongoRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const authentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
  const loginController = new LoginController(makeLoginValidation(), authentication);
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(loginController, logMongoRepository);
};
