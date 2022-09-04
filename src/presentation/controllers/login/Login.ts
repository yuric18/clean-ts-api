import {Controller, HttpRequest, HttpResponse} from "../../protocols";
import {InvalidParamError, MissingParamError} from "../../errors";
import {badRequest} from "../../helpers/HttpHelper";
import {EmailValidator} from "../../protocols/EmailValidator";

export class LoginController implements Controller {

  constructor(
    private emailValidator: EmailValidator
  ) {};

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
  }

}
