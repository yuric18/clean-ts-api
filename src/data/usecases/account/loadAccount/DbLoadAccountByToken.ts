import {
  Decrypter,
  LoadAccountByToken,
  LoadAccountByTokenRepository,
  AccountModel,
} from './DbLoadAccountByTokenProtocols';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    let token: string;

    try {
      token = await this.decrypter.decrypt(accessToken);
    } catch (e) {
      return null;
    }

    if (!token) return null;

    const account = await this.loadAccountByTokenRepository.loadByToken(
      accessToken,
      role
    );
    return account;
  }
}
