import { Controller } from '../../../../presentation/protocols';
import {
  LoginController,
} from '../../../../presentation/controllers/login/LoginController';
import { makeLoginValidation } from './LoginValidationFactory';
import { makeAuthentication } from '../../usecases/authentication/AuthenticationFactory';
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory';

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeLoginValidation(), makeAuthentication());
  return makeLogControllerDecorator(loginController);
};
