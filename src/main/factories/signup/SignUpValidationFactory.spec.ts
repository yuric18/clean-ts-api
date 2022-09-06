import { makeSignUpValidation } from "./SignUpValidationFactory";
import {
  ValidationComposite,
  CompareFieldsValidation,
  RequiredFieldValidation,
  EmailValidation
} from "../../../presentation/helpers/validators";
import { Validation } from "../../../presentation/protocols/Validation";
import { EmailValidator } from "../../../presentation/protocols/EmailValidator";

jest.mock('../../../presentation/helpers/validators/ValidationComposite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    };
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
      new EmailValidation('email', makeEmailValidator())
    ];

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
