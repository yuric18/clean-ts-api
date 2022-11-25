export interface CheckAccountByEmailRepository {
  checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Output>;
}

export namespace CheckAccountByEmailRepository {
  export type Output = boolean;
}
