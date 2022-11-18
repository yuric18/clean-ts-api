import { LoadSurveyById, SurveyModel } from '@/domain';

import { LoadSurveyByIdRepository } from '@/data';

export class DbLoadSurveyById implements LoadSurveyById {
  constructor(
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadById(id: string): Promise<SurveyModel> {
    return this.loadSurveyByIdRepository.loadById(id);
  }
}
