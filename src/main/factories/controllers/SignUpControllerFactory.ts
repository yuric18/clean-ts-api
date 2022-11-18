import {
  makeAddAccount,
  makeAuthentication,
  makeLogControllerDecorator,
} from '@/main/factories';
import { Controller, SignUpController } from '@/presentation';
import { makeSignUpValidation } from './SignUpValidationFactory';

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(
    makeAddAccount(),
    makeSignUpValidation(),
    makeAuthentication()
  );
  return makeLogControllerDecorator(signUpController);
};
