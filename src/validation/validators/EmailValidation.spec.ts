import { InvalidParamError } from '../../presentation/errors';
import { EmailValidation } from './EmailValidation';
import { EmailValidator } from '../protocols/EmailValidator';

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
};

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new EmailValidation('email', emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe('Email Validator', () => {
  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const error = sut.validate({ email: 'any_email@mail.com' });
    expect(error).toEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    sut.validate({ email: 'any_email' });
    expect(isValidSpy).toHaveBeenCalledWith('any_email');
  });

  test('Should throw error if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid')
      .mockImplementationOnce(() => { throw new Error(); });
    expect(sut.validate).toThrow();
  });
});
