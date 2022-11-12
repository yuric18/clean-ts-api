import { SurveyModel } from '../../entities/Survey';

export type AddSurveyParams = Omit<SurveyModel, 'id'>;

export interface AddSurvey {
  add(survey: AddSurveyParams): Promise<void>;
}
