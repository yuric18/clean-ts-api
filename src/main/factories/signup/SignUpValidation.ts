import {
  EmailValidation,
  CompareFieldsValidation,
  RequiredFieldValidation,
  ValidationComposite
} from "../../../presentation/helpers/validators";
import {Validation} from "../../../presentation/protocols/Validation";
import {EmailValidatorAdapter} from "../../../utils/EmailValidatorAdapter";


export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    ...['name', 'email', 'password', 'passwordConfirmation']
      .map(f => new RequiredFieldValidation(f)),
    new CompareFieldsValidation('password', 'passwordConfirmation'),
    new EmailValidation('email', new EmailValidatorAdapter())
  ];
  return new ValidationComposite(validations);
}
