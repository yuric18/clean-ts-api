import { SurveyModel } from '@/domain';

export interface AddSurvey {
  add(survey: AddSurvey.Input): Promise<void>;
}

export namespace AddSurvey {
  export type Input = Omit<SurveyModel, 'id'>;
  export type Output = void;
}
