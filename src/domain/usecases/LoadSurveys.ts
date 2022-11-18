import { SurveyModel } from '@/domain';

export interface LoadSurveys {
  load(acessToken: string): Promise<SurveyModel[]>;
}
