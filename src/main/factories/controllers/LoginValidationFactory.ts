import { Validation } from '@/presentation';
import {
  EmailValidation,
  EmailValidatorAdapter,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    ...['email', 'password'].map((f) => new RequiredFieldValidation(f)),
    new EmailValidation('email', new EmailValidatorAdapter()),
  ];
  return new ValidationComposite(validations);
};
