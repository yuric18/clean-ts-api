import { MissingParamError, InvalidParamError } from "../errors"
import { badRequest, serverError } from "../helpers/HttpHelper"
import { HttpRequest, HttpResponse, Controller, EmailValidator } from "../protocols"
import { AddAccount } from '../../domain/usecases/AddAccount';

export class SignUpController implements Controller {

  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      const isValidEmail = this.emailValidator.isValid(email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      this.addAccount.add({
        name,
        email,
        password
      });
    } catch (e) {
      return serverError();
    }
  }
};
