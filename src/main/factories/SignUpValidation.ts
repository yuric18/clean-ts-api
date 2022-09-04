import {
  ValidationComposite
} from "../../presentation/helpers/validators/ValidationComposite";
import {
  RequiredFieldValidation
} from "../../presentation/helpers/validators/RequiredFieldValidation";
import {Validation} from "../../presentation/helpers/validators/Validation";


export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = ['name', 'email', 'password', 'passwordConfirmation']
    .map(field => new RequiredFieldValidation(field));
  return new ValidationComposite(validations);
}
