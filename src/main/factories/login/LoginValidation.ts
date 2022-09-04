import {
  ValidationComposite
} from "../../../presentation/helpers/validators/ValidationComposite";
import {
  RequiredFieldValidation
} from "../../../presentation/helpers/validators/RequiredFieldValidation";
import {Validation} from "../../../presentation/protocols/Validation";
import {EmailValidation} from "../../../presentation/helpers/validators/EmailValidation";
import {EmailValidatorAdapter} from "../../../utils/EmailValidatorAdapter";

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    ...['email', 'password']
      .map(f => new RequiredFieldValidation(f)),
    new EmailValidation('email', new EmailValidatorAdapter())
  ];
  return new ValidationComposite(validations);
}