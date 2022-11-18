import {
  Authentication,
  AuthenticationParams,
  AuthenticatedAccountModel,
} from '@/domain';

import {
  HashComparer,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  Encrypter,
} from '@/data';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(
    authentication: AuthenticationParams
  ): Promise<AuthenticatedAccountModel> {
    const { email, password } = authentication;
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);

    if (account) {
      const isValid = await this.hashComparer.compare(
        password,
        account.password
      );

      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        );
        return {
          accessToken,
          name: account.name,
        };
      }
    }

    return null;
  }
}
