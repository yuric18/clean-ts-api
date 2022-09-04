import { Validation } from './Validation';
import { MissingParamError } from "../../errors";

export class RequiredFieldValidation implements Validation {

  constructor(private readonly fieldName: string) {};

  validate(input: any): Error {
    if (!input[this.fieldName])
      return new MissingParamError(this.fieldName);
  }

}