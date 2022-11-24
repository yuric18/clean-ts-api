import { LoadAnswersBySurvey } from '@/domain';

import { LoadSurveyByIdRepository } from '@/data';

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor(
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadBySurvey(id: string): Promise<LoadAnswersBySurvey.Output> {
    const survey = await this.loadSurveyByIdRepository.loadById(id);
    return survey?.answers.map((a) => a.answer) ?? [];
  }
}
