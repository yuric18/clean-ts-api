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
import {EmailValidation} from "../../presentation/helpers/validators/EmailValidation";
import {EmailValidatorAdapter} from "../../utils/EmailValidatorAdapter";


export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    ...['name', 'email', 'password', 'passwordConfirmation']
      .map(f => new RequiredFieldValidation(f)),
    new CompareFieldsValidation('password', 'passwordConfirmation'),
    new EmailValidation('email', new EmailValidatorAdapter())
  ];
  return new ValidationComposite(validations);
}
