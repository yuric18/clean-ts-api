import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  Authentication,
} from './LoginControllerProtocols';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/helpers/http/HttpHelper';

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body);
      if (validationError) return badRequest(validationError);

      const { email, password } = httpRequest.body;

      const authenticatedAccount = await this.authentication.auth({
        email,
        password,
      });
      if (!authenticatedAccount) {
        return unauthorized();
      }

      return ok(authenticatedAccount);
    } catch (e) {
      return serverError(e);
    }
  }
}
