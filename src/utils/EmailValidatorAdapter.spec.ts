import { EmailValidatorAdapter } from "./EmailValidator";

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    const result = sut.isValid('invalid_email@mail.com');
    expect(result).toBeFalsy();
  });
});
