import { EmailValidatorAdapter } from "./EmailValidator";
import validator from 'validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  }
}));

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const result = sut.isValid('invalid_email@mail.com');
    expect(result).toBeFalsy();
  });

  test('Should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter();
    const result = sut.isValid('valid_email@mail.com');
    expect(result).toBeTruthy();
  });
});
