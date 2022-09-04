import { makeSignUpValidation } from "./SignUpValidation";
import {
  ValidationComposite
} from "../../presentation/helpers/validators/ValidationComposite";
import {
  RequiredFieldValidation
} from "../../presentation/helpers/validators/RequiredFieldValidation";
import {Validation} from "../../presentation/helpers/validators/Validation";
import {
  CompareFieldsValidation
} from "../../presentation/helpers/validators/CompareFieldsValidation";

jest.mock('../../presentation/helpers/validators/ValidationComposite');

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeSignUpValidation();
    const validations: Validation[] = [
      ...['name', 'email', 'password', 'passwordConfirmation']
        .map(f => new RequiredFieldValidation(f)),
      new CompareFieldsValidation('password', 'passwordConfirmation')
    ];

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
