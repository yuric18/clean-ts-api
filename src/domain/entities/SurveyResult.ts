export interface SurveyResultModel {
  surveyId: string;
  question: string;
  answers: SurveyResultAnswerModel[];
  date: Date;
}

export interface SurveyResultAnswerModel {
  answer: string;
  count: number;
  percent: number;
  image?: string;
}
