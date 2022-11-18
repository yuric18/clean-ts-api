import { Authentication } from '@/domain';
import {
  badRequest,
  Controller,
  HttpResponse,
  ok,
  serverError,
  unauthorized,
  Validation,
} from '@/presentation';

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(input: LoginController.Input): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(input);
      if (validationError) return badRequest(validationError);

      const { email, password } = input;

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

export namespace LoginController {
  export type Input = {
    email: string;
    password: string;
  };
}
