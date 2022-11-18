import { EmailValidator } from '@/index';

export const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorFake implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorFake();
};
