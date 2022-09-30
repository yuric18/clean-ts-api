import { AddSurveyModel } from '@/domain/usecases/survey/AddSurvey';

export interface AddSurveyRepository {
  add(survey: AddSurveyModel): Promise<void>
}