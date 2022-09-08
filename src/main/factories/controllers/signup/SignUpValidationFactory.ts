import {
  EmailValidation,
  CompareFieldsValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../../validation/validators';
import { Validation } from '../../../../presentation/protocols/Validation';
import { EmailValidatorAdapter } from '../../../adapters/validators/EmailValidatorAdapter';


export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    ...['name', 'email', 'password', 'passwordConfirmation']
      .map(f => new RequiredFieldValidation(f)),
    new CompareFieldsValidation('password', 'passwordConfirmation'),
    new EmailValidation('email', new EmailValidatorAdapter()),
  ];
  return new ValidationComposite(validations);
};
