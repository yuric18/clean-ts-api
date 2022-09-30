import { SurveyModel } from '../entities/Survey';

export interface LoadSurveyById {
  loadById(): Promise<SurveyModel>
}
