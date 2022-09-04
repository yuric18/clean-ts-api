import { InvalidParamError } from "../../errors";
import { CompareFieldsValidation } from "./CompareFieldsValidation";

type SutTypes = {
  sut: CompareFieldsValidation
};

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('password', 'passwordValidation');
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
});