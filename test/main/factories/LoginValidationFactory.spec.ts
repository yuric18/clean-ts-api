import { makeLoginValidation } from '@/main/factories/controllers/LoginValidationFactory';

import {
  EmailValidation,
  EmailValidator,
  RequiredFieldValidation,
  Validation,
  ValidationComposite,
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

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeLoginValidation();
    const validations: Validation[] = [
      ...['email', 'password'].map((f) => new RequiredFieldValidation(f)),
      new EmailValidation('email', makeEmailValidator()),
    ];

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
