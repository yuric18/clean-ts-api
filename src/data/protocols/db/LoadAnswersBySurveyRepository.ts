export interface LoadAnswersBySurveyRepository {
  loadBySurvey(id: string): Promise<LoadAnswersBySurveyRepository.Output>;
}

export namespace LoadAnswersBySurveyRepository {
  export type Output = string[];
}
