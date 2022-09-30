import { makeSignUpValidation } from './SignUpValidationFactory';
import {
  ValidationComposite,
  CompareFieldsValidation,
  RequiredFieldValidation,
  EmailValidation,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols/Validation';
import { EmailValidator } from '@/validation/protocols/EmailValidator';

jest.mock('@/validation/validators/ValidationComposite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeSignUpValidation();
    const validations: Validation[] = [
      ...['name', 'email', 'password', 'passwordConfirmation']
        .map(f => new RequiredFieldValidation(f)),
      new CompareFieldsValidation('password', 'passwordConfirmation'),
      new EmailValidation('email', makeEmailValidator()),
    ];

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
