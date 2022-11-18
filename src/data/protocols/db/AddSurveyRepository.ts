import { AddSurveyParams } from '@/domain';

export interface AddSurveyRepository {
  add(survey: AddSurveyParams): Promise<void>;
}
