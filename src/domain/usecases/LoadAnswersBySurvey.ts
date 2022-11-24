export interface LoadAnswersBySurvey {
  loadBySurvey(id: string): Promise<LoadAnswersBySurvey.Output>;
}

export namespace LoadAnswersBySurvey {
  export type Output = string[];
}
