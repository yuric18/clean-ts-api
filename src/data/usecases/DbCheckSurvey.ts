import { CheckSurveyById } from '@/domain';

import { CheckSurveyByIdRepository } from '@/data';

export class DbCheckSurveyById implements CheckSurveyById {
  constructor(
    private readonly checkSurveyByIdRepository: CheckSurveyByIdRepository
  ) {}

  async checkById(id: string): Promise<CheckSurveyById.Output> {
    return this.checkSurveyByIdRepository.checkById(id);
  }
}
