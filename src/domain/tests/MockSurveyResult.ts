import { SurveyResultModel } from '../entities/SurveyResult';
import { SaveSurveyResultModel } from '../usecases/surveyResult/SaveSurveyResult';

export const mockSurveyResultParams = (): SaveSurveyResultModel => ({
  accountId: 'any_accountId',
  surveyId: 'any_surveyId',
  answer: 'any_answer',
  date: new Date(),
});

export const mockSurveyResult = (): SurveyResultModel => ({
  surveyId: 'any_surveyId',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 1,
    percent: 50,
  },
  {
    answer: 'other_answer',
    count: 1,
    percent: 50,
    image: 'any_image',
  }],
  date: new Date(),
});