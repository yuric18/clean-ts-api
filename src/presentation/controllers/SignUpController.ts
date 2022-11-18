import { AddAccount, Authentication } from '@/domain';

import {
  badRequest,
  Controller,
  EmailAlreadyExists,
  forbidden,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  Validation,
} from '@/presentation';

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

      const authenticatedAccount = await this.authentication.auth({
        email,
        password,
      });
      return ok(authenticatedAccount);
    } catch (e) {
      return serverError(e);
    }
  }
}
