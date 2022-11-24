export interface CheckSurveyById {
  checkById(id: string): Promise<CheckSurveyById.Output>;
}

export namespace CheckSurveyById {
  export type Output = boolean;
}
