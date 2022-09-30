import { SurveyModel } from '../entities/Survey';

export interface LoadSurveyById {
  loadById(id: string): Promise<SurveyModel>
}
