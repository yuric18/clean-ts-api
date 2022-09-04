import { Validation } from "./Validation";
import { ValidationComposite } from "./ValidationComposite";

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  };
  return new ValidationStub();
}

type SutTypes = {
  sut: ValidationComposite
  validationStub: Validation
};

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();
  const sut = new ValidationComposite([ validationStub ]);
  return {
    sut,
    validationStub
  }
};

describe('ValidationComposite Validation', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const error = sut.validate({ field: 'any_value' });
    expect(error).toBeInstanceOf(Error);
  });

  test('should return undefined if validation passes', () => {
    const { sut } = makeSut();
    const error = sut.validate({ field: 'any_value' });
    expect(error).toBeUndefined();
  });
});