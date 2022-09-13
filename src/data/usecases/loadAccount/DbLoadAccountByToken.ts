import { Decrypter } from '../../protocols/criptography/Decrypter';
import { LoadAccountByTokenRepository } from '../../protocols/db/account/LoadAccountByTokenRepository';
import { AccountModel } from '../addAccount/DbAddAccountProtocols';

export class DbLoadAccountByToken implements LoadAccountByTokenRepository {
  constructor(
    private readonly decrypter: Decrypter,
  ) {}

  async loadByToken(token: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(token);
    return;
  }

}