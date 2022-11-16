import { AuthenticatedAccountModel } from '@/domain/entities/Account';

export type AuthenticationParams = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(
    authentication: AuthenticationParams
  ): Promise<AuthenticatedAccountModel>;
}
