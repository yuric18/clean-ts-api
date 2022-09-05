import { Authentication, AuthenticationModel } from "../../../domain/usecases/Authentication";
import { HashComparer } from "../../protocols/criptography/HashComparer";
import { LoadAccountByEmailRepository } from "../../protocols/db/LoadAccountByEmailRepository";
import {TokenGenerator} from "../../protocols/criptography/TokenGenerator";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const { email, password } = authentication;
    const account = await this.loadAccountByEmailRepository.load(email);

    if (account) {
      await this.hashComparer.compare(password, account.password);
      await this.tokenGenerator.generate(account.id);
    }

    return null;
  }
};
