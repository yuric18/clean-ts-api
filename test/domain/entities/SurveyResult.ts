import { SurveyResultModel } from '@/index';

export const mockSurveyResult = (): SurveyResultModel => ({
  surveyId: 'any_surveyId',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      image: 'any_image',
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false,
    },
    {
      answer: 'other_answer',
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false,
    },
  ],
  date: new Date(),
});
