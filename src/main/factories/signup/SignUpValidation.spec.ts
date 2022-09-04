import { makeSignUpValidation } from "./SignUpValidation";
import {
  ValidationComposite
} from "../../../presentation/helpers/validators/ValidationComposite";
import {
  RequiredFieldValidation
} from "../../../presentation/helpers/validators/RequiredFieldValidation";
import {Validation} from "../../../presentation/protocols/Validation";
import {
  CompareFieldsValidation
} from "../../../presentation/helpers/validators/CompareFieldsValidation";
import {EmailValidation} from "../../../presentation/helpers/validators/EmailValidation";
import {EmailValidator} from "../../../presentation/protocols/EmailValidator";

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
