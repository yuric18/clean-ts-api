import { MissingParamError } from '../../errors';
import { RequiredFieldValidation } from './RequiredFieldValidation';

type SutTypes = {
  sut: RequiredFieldValidation
};

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('email');
  return {
    sut,
  };
};

describe('RequiredField Validation', () => {
  test('should return MissingParamError if validation fails', async () => {
    const { sut } = makeSut();
    const error = sut.validate({ name: 'any_name' });
    expect(error).toBeInstanceOf(MissingParamError);
  });

  test('should return null if validation passes', () => {
    const { sut } = makeSut();
    const error = sut.validate({ email: 'any_mail' });
    expect(error).toBeUndefined();
  });
});