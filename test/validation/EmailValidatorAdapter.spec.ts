import { EmailValidatorAdapter } from '@/index';
import validator from 'validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const result = sut.isValid('invalid_email@mail.com');
    expect(result).toBeFalsy();
  });

  test('Should return true if validator returns true', () => {
    const sut = makeSut();
    const result = sut.isValid('valid_email@mail.com');
    expect(result).toBeTruthy();
  });

  test('Should call validator with corect email', () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    sut.isValid('any_email@mail.com');
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
