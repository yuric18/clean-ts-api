import { AddSurveyParams } from '@/domain/usecases/survey/AddSurvey';

export interface AddSurveyRepository {
  add(survey: AddSurveyParams): Promise<void>
}