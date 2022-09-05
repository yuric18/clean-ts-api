import { makeLoginValidation } from "./LoginValidation";
import {
  ValidationComposite,
  EmailValidation,
  RequiredFieldValidation
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

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeLoginValidation();
    const validations: Validation[] = [
      ...['email', 'password']
        .map(f => new RequiredFieldValidation(f)),
      new EmailValidation('email', makeEmailValidator())
    ];

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});