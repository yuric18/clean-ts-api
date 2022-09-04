import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  AddAccount,
  Validation
} from "./SignUpProtocols";
import { InvalidParamError } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/HttpHelper";

export class SignUpController implements Controller {

  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body);
      if (validationError) return badRequest(validationError);

      const { name, email, password } = httpRequest.body

      const isValidEmail = this.emailValidator.isValid(email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      });

      return ok(account);
    } catch (e) {
      return serverError(e);
    }
  }
};
