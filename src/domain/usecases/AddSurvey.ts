type SurveyAnswer = {
  answer: string
  image?: string
};

export type AddSurveyModel = {
  question: string
  answers: SurveyAnswer[]
};

export interface AddSurvey {
  add(survey: AddSurveyModel): Promise<void>
}
