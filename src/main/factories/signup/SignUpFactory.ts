import { SignUpController } from '../../../presentation/controllers/signup/SignUpController';
import { DbAddAccount } from '../../../data/usecases/addAccount/DbAddAccount';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/BcryptAdapter';
import { AccountMongoRepository } from "../../../infra/db/mongodb/account/AccountMongoRepository";
import { LogMongoRepository } from "../../../infra/db/mongodb/log/LogMongoRepository";
import { Controller } from "../../../presentation/protocols";

import { LogControllerDecorator } from "../../decorators/LogControllerDecorator";
import {makeSignUpValidation} from "./SignUpValidationFactory";


export const makeSignUpController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const logMongoRepository = new LogMongoRepository();
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation());
  return new LogControllerDecorator(signUpController, logMongoRepository);
}
