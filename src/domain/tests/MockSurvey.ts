import { SurveyModel } from '../entities/Survey';
import { AddSurveyParams } from '../usecases/survey/AddSurvey';

export const mockSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    image: 'any_image',
  }, {
    answer: 'other_answer',
  }],
  date: new Date(),
});


export const mockSurveys = (): SurveyModel[] => ([
  mockSurvey(),
]);

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    image: 'any_image',
  }, {
    answer: 'other_answer',
    image: 'any_image',
  }, {
    answer: 'any_other_answer',
    image: 'any_image',
  }],
  date: new Date(),
});