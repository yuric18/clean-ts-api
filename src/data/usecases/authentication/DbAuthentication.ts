import { Authentication, AuthenticationModel } from "../../../domain/usecases/Authentication";
import { HashComparer } from "../../protocols/criptography/HashComparer";
import { LoadAccountByEmailRepository } from "../../protocols/db/LoadAccountByEmailRepository";
import {TokenGenerator} from "../../protocols/criptography/TokenGenerator";
import {
  UpdateAccessTokenRepository
} from "../../protocols/db/UpdateAccessTokenRepository";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const { email, password } = authentication;
    const account = await this.loadAccountByEmailRepository.load(email);

    if (account) {
      const isValid = await this.hashComparer.compare(password, account.password);

      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id);
        await this.updateAccessTokenRepository.update(account.id, accessToken);
        return accessToken;
      }
    }

    return null;
  }
}