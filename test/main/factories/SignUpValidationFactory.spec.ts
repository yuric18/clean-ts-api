import { makeSignUpValidation } from '@/main/factories/controllers/SignUpValidationFactory';
import {
  EmailValidation,
  EmailValidator,
  RequiredFieldValidation,
  Validation,
  ValidationComposite,
  CompareFieldsValidation,
} from '@/index';

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
      ...['name', 'email', 'password', 'passwordConfirmation'].map(
        (f) => new RequiredFieldValidation(f)
      ),
      new CompareFieldsValidation('password', 'passwordConfirmation'),
      new EmailValidation('email', makeEmailValidator()),
    ];

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
