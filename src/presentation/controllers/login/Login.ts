import {Controller, HttpRequest, HttpResponse} from "../../protocols";
import {InvalidParamError, MissingParamError} from "../../errors";
import {badRequest, serverError} from "../../helpers/HttpHelper";
import {EmailValidator} from "../../protocols/EmailValidator";
import {Authentication} from "../../../domain/usecases/Authentication";

export class LoginController implements Controller {

  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {};

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'email',
        'password'
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, password } = httpRequest.body;
      if (!email) {
        return badRequest(new MissingParamError('email'));
      }

      if (!password) {
        return badRequest(new MissingParamError('password'));
      }

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      await this.authentication.auth(email, password);
    } catch (e) {
      return serverError(e);
    }
  }

}
