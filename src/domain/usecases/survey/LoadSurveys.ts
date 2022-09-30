import { SurveyModel } from '../../entities/Survey';

export interface LoadSurveys {
  load(): Promise<SurveyModel[]>
}
