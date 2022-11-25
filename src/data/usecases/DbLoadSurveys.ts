import { LoadSurveys, SurveyModel } from '@/domain';

import { LoadSurveysRepository } from '@/data';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load(accountId): Promise<LoadSurveys.Output> {
    return this.loadSurveysRepository.loadAll(accountId);
  }
}
