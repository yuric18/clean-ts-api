import {
  AccountMongoRepository
} from "../../../../infra/db/mongodb/account/AccountMongoRepository";
import {BcryptAdapter} from "../../../../infra/criptography/bcrypt/BcryptAdapter";
import env from "../../../config/env";
import {AddAccount} from "../../../../domain/usecases/AddAccount";
import {DbAddAccount} from "../../../../data/usecases/addAccount/DbAddAccount";

export const makeAddAccount = (): AddAccount => {
  const hasher = new BcryptAdapter(parseInt(env.salt));
  const addAccountRepository = new AccountMongoRepository();
  return new DbAddAccount(hasher, addAccountRepository)
};
