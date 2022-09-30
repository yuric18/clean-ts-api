import {
  SignUpController,
} from '@/presentation/controllers/auth/signup/SignUpController';
import { Controller } from '@/presentation/protocols';
import { makeSignUpValidation } from './SignUpValidationFactory';
import { makeAuthentication } from '../../usecases/account/authentication/AuthenticationFactory';
import { makeAddAccount } from '../../usecases/account/addAccount/AddAccountFactory';
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory';


export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeAddAccount(), makeSignUpValidation(), makeAuthentication());
  return makeLogControllerDecorator(signUpController);
};
