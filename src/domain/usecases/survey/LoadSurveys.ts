import { SurveyModel } from '../../entities/Survey';

export interface LoadSurveys {
  load(acessToken: string): Promise<SurveyModel[]>;
}
