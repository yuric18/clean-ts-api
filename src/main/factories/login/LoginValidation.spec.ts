import { makeLoginValidation } from "./LoginValidation";
import {
  ValidationComposite
} from "../../../presentation/helpers/validators/ValidationComposite";
import {
  RequiredFieldValidation
} from "../../../presentation/helpers/validators/RequiredFieldValidation";
import {Validation} from "../../../presentation/helpers/validators/Validation";
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
