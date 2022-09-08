import { SignUpController } from '../../../presentation/controllers/signup/SignUpController';
import { DbAddAccount } from '../../../data/usecases/addAccount/DbAddAccount';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/BcryptAdapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/AccountMongoRepository';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/LogMongoRepository';
import { Controller } from '../../../presentation/protocols';

import { LogControllerDecorator } from '../../decorators/LogControllerDecorator';
import { makeSignUpValidation } from './SignUpValidationFactory';
import {JwtAdapter} from "../../../infra/criptography/jwt/JwtAdapter";
import env from "../../config/env";
import {DbAuthentication} from "../../../data/usecases/authentication/DbAuthentication";


export const makeSignUpController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const authentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const logMongoRepository = new LogMongoRepository();
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation(), authentication);
  return new LogControllerDecorator(signUpController, logMongoRepository);
};
