import { InvalidParamError } from "../../errors";
import { CompareFieldsValidation } from "./CompareFieldsValidation";

type SutTypes = {
  sut: CompareFieldsValidation
};

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('password', 'passwordConfirmation');
  return {
    sut
  }
};

describe('CompareFields Validation', () => {
  test('should return InvalidParamError if validation fails', () => {
    const { sut } = makeSut();
    const error = sut.validate({
      password: 'any_value',
      passwordConfirmation: 'any_other_value'
    });
    expect(error).toBeInstanceOf(InvalidParamError);
  });

  test('should return undefined if validation passes', () => {
    const { sut } = makeSut();
    const error = sut.validate({
      password: 'any_value',
      passwordConfirmation: 'any_value'
    });
    expect(error).toBeUndefined();
  });
});