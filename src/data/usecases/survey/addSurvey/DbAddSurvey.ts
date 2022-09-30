import { AddSurvey, AddSurveyModel } from '@/domain/usecases/survey/AddSurvey';
import { AddSurveyRepository } from '@/data/protocols/db/survey/AddSurveyRepository';

export class DbAddSurvey implements AddSurvey {

  constructor(
    private readonly addSurveyRepository: AddSurveyRepository,
  ) {}

  async add(survey: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(survey);
    return null;
  }

}