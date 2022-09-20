type SurveyAnswer = {
  answer: string
  image?: string
};

export type AddSurveyModel = {
  question: string
  answers: SurveyAnswer[]
  date: Date
};

export interface AddSurvey {
  add(survey: AddSurveyModel): Promise<void>
}
