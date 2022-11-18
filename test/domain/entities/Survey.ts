import { SurveyModel } from '@/index';

export const mockSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      image: 'any_image',
    },
    {
      answer: 'other_answer',
    },
  ],
  date: new Date(),
});
