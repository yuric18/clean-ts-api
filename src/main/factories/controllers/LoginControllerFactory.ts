import {
  makeAuthentication,
  makeLogControllerDecorator,
} from '@/main/factories';
import { LoginController } from '@/presentation';
import { Controller } from '@/presentation/protocols';
import { makeLoginValidation } from './LoginValidationFactory';

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(
    makeLoginValidation(),
    makeAuthentication()
  );
  return makeLogControllerDecorator(loginController);
};
