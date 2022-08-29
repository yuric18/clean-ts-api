import { MissingParamError, InvalidParamError } from "../errors"
import { badRequest, serverError } from "../helpers/HttpHelper"
import { HttpRequest, HttpResponse, Controller, EmailValidator } from "../protocols"

export class SignUpController implements Controller {

  constructor(
    private readonly emailValidator: EmailValidator
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

      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }
    } catch (e) {
      return serverError();
    }
  }
};
