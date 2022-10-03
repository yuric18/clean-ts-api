import { SurveyModel } from '../entities/Survey';

export const mockSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    image: 'any_image',
  }],
  date: new Date(),
});


export const mockSurveys = (): SurveyModel[] => ([{
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    image: 'any_image',
  }],
  id: 'any_id',
  date: new Date(),
}]);