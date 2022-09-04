import { Validation } from './Validation';
import {InvalidParamError, MissingParamError} from "../../errors";

export class CompareFieldsValidation implements Validation {

  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {};

  validate(input: any): Error {
    if (this.fieldName !== this.fieldToCompareName)
      return new InvalidParamError(this.fieldToCompareName);
  }

}
