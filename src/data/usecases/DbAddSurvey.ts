import { AddSurvey, AddSurveyParams } from '@/domain';
import { AddSurveyRepository } from '@/data';

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

  async add(survey: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(survey);
    return null;
  }
}
