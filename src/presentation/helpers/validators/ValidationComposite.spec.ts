import { Validation } from "./Validation";
import { ValidationComposite } from "./ValidationComposite";

type SutTypes = {
  sut: ValidationComposite
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return new Error();
    }
  };
  return new ValidationStub();
}

const makeSut = (): SutTypes => {
  const sut = new ValidationComposite([ makeValidation() ]);
  return {
    sut
  }
};

describe('ValidationComposite Validation', () => {
  test('should return an error if any validation fails', () => {
    const { sut } = makeSut();
    const error = sut.validate({ field: 'any_value' });
    expect(error).toBeInstanceOf(Error);
  });

});