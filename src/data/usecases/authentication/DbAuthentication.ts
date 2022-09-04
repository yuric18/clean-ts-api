import { Authentication, AuthenticationModel } from "../../../domain/usecases/Authentication";
import { LoadAccountByEmailRepository } from "../../protocols/db/LoadAccountByEmailRepository";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}
  
  async auth(authentication: AuthenticationModel): Promise<string> {
    const { email } = authentication;
    await this.loadAccountByEmailRepository.load(email);
    return null;
  }
};