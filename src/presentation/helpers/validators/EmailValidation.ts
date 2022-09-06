import { Validation } from '../../protocols/Validation';
import { InvalidParamError } from '../../errors';
import { EmailValidator } from '../../protocols/EmailValidator';

export class EmailValidation implements Validation {

  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: any): Error {
    if (!this.emailValidator.isValid(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName);
    }
  }

}
