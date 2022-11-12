import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidatorAdapter,
} from '@/validation/validators';
import { EmailValidation } from '@/validation/validators';
import { Validation } from '@/presentation/protocols/Validation';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    ...['email', 'password'].map((f) => new RequiredFieldValidation(f)),
    new EmailValidation('email', new EmailValidatorAdapter()),
  ];
  return new ValidationComposite(validations);
};
