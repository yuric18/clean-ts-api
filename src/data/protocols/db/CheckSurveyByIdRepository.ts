export interface CheckSurveyByIdRepository {
  checkById(id: string): Promise<CheckSurveyByIdRepository.Output>;
}

export namespace CheckSurveyByIdRepository {
  export type Output = boolean;
}
