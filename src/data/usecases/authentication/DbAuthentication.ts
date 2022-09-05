import { Authentication, AuthenticationModel } from "../../../domain/usecases/Authentication";
import { HashComparer } from "../../protocols/criptography/HashComparer";
import { LoadAccountByEmailRepository } from "../../protocols/db/LoadAccountByEmailRepository";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}
  
  async auth(authentication: AuthenticationModel): Promise<string> {
    const { email, password } = authentication;
    const account = await this.loadAccountByEmailRepository.load(email);

    if (account) {
      this.hashComparer.compare(password, account.password);
    }
    return null;
  }
};