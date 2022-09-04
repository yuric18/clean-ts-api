import { InvalidParamError } from "../../errors";
import { CompareFieldsValidation } from "./CompareFieldsValidation";

type SutTypes = {
  sut: CompareFieldsValidation
};

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare');
  return {
    sut
  }
};

describe('CompareFields Validation', () => {
  test('should return InvalidParamError if validation fails', () => {
    const { sut } = makeSut();
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_other_value'
    });
    expect(error).toBeInstanceOf(InvalidParamError);
  });

  test('should return undefined if validation passes', () => {
    const { sut } = makeSut();
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    });
    expect(error).toBeUndefined();
  });
});