import { SurveyModel } from '@/domain';

export interface LoadSurveys {
  load(acessToken: string): Promise<LoadSurveys.Output>;
}

export namespace LoadSurveys {
  export type Output = SurveyModel[];
}
