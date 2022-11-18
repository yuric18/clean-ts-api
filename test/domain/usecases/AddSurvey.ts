import { AddSurvey, AddSurveyParams } from '@/index';

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      image: 'any_image',
    },
    {
      answer: 'other_answer',
      image: 'any_image',
    },
    {
      answer: 'any_other_answer',
      image: 'any_image',
    },
  ],
  date: new Date(),
});

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(survey: AddSurveyParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new AddSurveyStub();
};
