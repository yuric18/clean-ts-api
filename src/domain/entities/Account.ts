export interface AccountModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
}

export type AuthenticatedAccountModel = Pick<AccountModel, 'name'> & {
  accessToken: string;
};
