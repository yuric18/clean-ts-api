import { SurveyResultModel, LoadSurveyResult } from '@/domain';

import { LoadSurveyResultRepository, LoadSurveyByIdRepository } from '@/data';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
    const surveyResultFound =
      await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accountId);

    if (!surveyResultFound) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId);
      return {
        surveyId,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map((a) =>
          Object.assign({}, a, {
            count: 0,
            percent: 0,
            isCurrentAccountAnswer: false,
          })
        ),
      };
    }

    return surveyResultFound;
  }
}
