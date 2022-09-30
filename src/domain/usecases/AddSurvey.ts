import { SurveyModel } from '../entities/Survey';

export type AddSurveyModel = Omit<SurveyModel, 'id'>;

export interface AddSurvey {
  add(survey: AddSurveyModel): Promise<void>
}
