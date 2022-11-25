import { AddSurvey } from '@/domain';
import { AddSurveyRepository } from '@/data';

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

  async add(survey: AddSurvey.Input): Promise<AddSurvey.Output> {
    await this.addSurveyRepository.add(survey);
    return null;
  }
}
