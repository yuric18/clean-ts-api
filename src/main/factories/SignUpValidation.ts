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


export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    ...['name', 'email', 'password', 'passwordConfirmation']
      .map(f => new RequiredFieldValidation(f)),
    new CompareFieldsValidation('password', 'passwordConfirmation')
  ];
  return new ValidationComposite(validations);
}
