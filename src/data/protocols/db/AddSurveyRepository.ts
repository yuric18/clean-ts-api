import { AddSurvey } from '@/domain';

export interface AddSurveyRepository {
  add(survey: AddSurveyRepository.Input): Promise<AddSurveyRepository.Output>;
}

export namespace AddSurveyRepository {
  export type Input = AddSurvey.Input;
  export type Output = void;
}
