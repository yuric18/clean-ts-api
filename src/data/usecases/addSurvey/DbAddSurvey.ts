import { AddSurvey, AddSurveyModel } from '../../../domain/usecases/AddSurvey';
import { AddSurveyRepository } from '../../protocols/db/survey/AddSurveyRepository';

export class DbAddSurvey implements AddSurvey {

  constructor(
    private readonly addSurveyRepository: AddSurveyRepository,
  ) {}

  async add(survey: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(survey);
    return null;
  }

}