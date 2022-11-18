import { AddAccount, Authentication } from '@/domain';

import {
  badRequest,
  Controller,
  EmailAlreadyExists,
  forbidden,
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

  async handle(input: SignUpController.Input): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(input);
      if (validationError) return badRequest(validationError);

      const { name, email, password, role } = input;

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

export namespace SignUpController {
  export type Input = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    role?: string;
  };
}
