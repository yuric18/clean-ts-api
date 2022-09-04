import { SignUpController } from '../../../presentation/controllers/signup/SignUp';
import { DbAddAccount } from '../../../data/usecases/addAccount/DbAddAccount';
import { BcryptAdapter } from '../../../infra/criptography/BcryptAdapter';
import { AccountMongoRepository } from "../../../infra/db/mongodb/account-repository/Account";
import { LogMongoRepository } from "../../../infra/db/mongodb/log-repository/Log";
import { Controller } from "../../../presentation/protocols";

import { LogControllerDecorator } from "../../decorators/Log";
import {makeSignUpValidation} from "./SignUpValidation";


export const makeSignUpController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const logMongoRepository = new LogMongoRepository();
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation());
  return new LogControllerDecorator(signUpController, logMongoRepository);
}
