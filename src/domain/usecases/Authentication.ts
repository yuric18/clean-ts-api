import { AuthenticatedAccountModel } from '@/domain';

export interface Authentication {
  auth(authentication: Authentication.Input): Promise<Authentication.Output>;
}

export namespace Authentication {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = AuthenticatedAccountModel;
}
