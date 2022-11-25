import {
  AddSurveyRepository,
  CheckSurveyByIdRepository,
  LoadAnswersBySurveyRepository,
  LoadSurveyByIdRepository,
  LoadSurveysRepository,
} from '@/data';
import { MongoHelper, QueryBuilder } from './helpers';

import { ObjectId } from 'mongodb';

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    CheckSurveyByIdRepository,
    LoadAnswersBySurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository
{
  async add(
    survey: AddSurveyRepository.Input
  ): Promise<AddSurveyRepository.Output> {
    await MongoHelper.insertOne('surveys', survey);
    return null;
  }

  async checkById(id: string): Promise<boolean> {
    return !!MongoHelper.getCollection('surveys').findOne({
      _id: new ObjectId(id),
    });
  }

  async loadAll(accountId: string): Promise<LoadSurveysRepository.Output> {
    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result',
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: '$result',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.accountId', new ObjectId(accountId)],
                  },
                },
              },
            },
            1,
          ],
        },
      })
      .build();

    const collection = MongoHelper.getCollection('surveys');
    const surveys = await collection.aggregate(query).toArray();
    return MongoHelper.mapArray(surveys);
  }

  async loadById(id: string): Promise<LoadSurveyByIdRepository.Output> {
    const collection = MongoHelper.getCollection('surveys');
    const survey = await collection.findOne({
      _id: new ObjectId(id),
    });
    return survey && MongoHelper.map(survey);
  }

  async loadBySurvey(
    id: string
  ): Promise<LoadAnswersBySurveyRepository.Output> {
    const collection = MongoHelper.getCollection('surveys');
    const aggregate = new QueryBuilder()
      .match({ _id: new ObjectId(id) })
      .project({ _id: 0, answers: '$answers.answer' })
      .build();
    const surveys = await collection.aggregate(aggregate).toArray();
    return surveys[0]?.answers ?? [];
  }
}
