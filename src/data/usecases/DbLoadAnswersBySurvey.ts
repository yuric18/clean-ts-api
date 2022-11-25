import { LoadAnswersBySurvey } from '@/domain';

import { LoadAnswersBySurveyRepository } from '@/data';

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor(
    private readonly loadAnswersBySurveyRepository: LoadAnswersBySurveyRepository
  ) {}

  async loadBySurvey(id: string): Promise<LoadAnswersBySurvey.Output> {
    return this.loadAnswersBySurveyRepository.loadBySurvey(id);
  }
}
