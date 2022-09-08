import {
  ValidationComposite,
  RequiredFieldValidation,
} from '../../../../presentation/helpers/validators';
import { EmailValidation } from '../../../../presentation/helpers/validators';
import { Validation } from '../../../../presentation/protocols/Validation';
import { EmailValidatorAdapter } from '../../../adapters/validators/EmailValidatorAdapter';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    ...['email', 'password']
      .map(f => new RequiredFieldValidation(f)),
    new EmailValidation('email', new EmailValidatorAdapter()),
  ];
  return new ValidationComposite(validations);
};
