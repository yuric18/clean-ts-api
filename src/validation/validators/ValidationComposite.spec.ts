import { mockValidation } from '@/validation/test';
import {
  InvalidParamError,
  MissingParamError,
} from '../../presentation/errors';
import { Validation } from '../../presentation/protocols';
import { ValidationComposite } from './ValidationComposite';

type SutTypes = {
  sut: ValidationComposite;
  validationStubs: Validation[];
};

const makeSut = (): SutTypes => {
  const validationStubs = [mockValidation(), mockValidation()];
  const sut = new ValidationComposite(validationStubs);
  return {
    sut,
    validationStubs,
  };
};

describe('ValidationComposite Validation', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error());
    const error = sut.validate({ field: 'any_value' });
    expect(error).toBeInstanceOf(Error);
  });

  test('should return first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest
      .spyOn(validationStubs[0], 'validate')
      .mockReturnValueOnce(new InvalidParamError('field'));
    jest
      .spyOn(validationStubs[1], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ field: 'any_value' });
    expect(error).toBeInstanceOf(InvalidParamError);
  });

  test('should return undefined if validation passes', () => {
    const { sut } = makeSut();
    const error = sut.validate({ field: 'any_value' });
    expect(error).toBeUndefined();
  });
});
