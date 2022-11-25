import { AddSurvey } from '@/index';

export const mockAddSurveyInput = (): AddSurvey.Input => ({
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
    async add(survey: AddSurvey.Input): Promise<AddSurvey.Output> {
      return Promise.resolve();
    }
  }
  return new AddSurveyStub();
};
