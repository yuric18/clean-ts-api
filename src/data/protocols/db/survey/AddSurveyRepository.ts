import { AddSurveyModel } from '@/domain/usecases/AddSurvey';

export interface AddSurveyRepository {
  add(survey: AddSurveyModel): Promise<void>
}