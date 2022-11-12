import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  Validation,
  Authentication,
} from './SignUpControllerProtocols';
import {
  badRequest,
  serverError,
  ok,
  forbidden,
} from '@/presentation/helpers/http/HttpHelper';
import { EmailAlreadyExists } from '@/presentation/errors';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body);
      if (validationError) return badRequest(validationError);

      const { name, email, password, role } = httpRequest.body;

      const account = await this.addAccount.add({
        name,
        email,
        password,
        role,
      });

      if (!account) return forbidden(new EmailAlreadyExists());

      const accessToken = await this.authentication.auth({ email, password });
      return ok({ accessToken });
    } catch (e) {
      return serverError(e);
    }
  }
}
