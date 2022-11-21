import {
  AddSurveyRepository,
  LoadSurveyByIdRepository,
  LoadSurveysRepository,
} from '@/data';
import { MongoHelper, QueryBuilder } from './helpers';

import { SurveyModel } from '@/domain';
import { ObjectId } from 'mongodb';

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository
{
  async add(
    survey: AddSurveyRepository.Input
  ): Promise<AddSurveyRepository.Output> {
    await MongoHelper.insertOne('surveys', survey);
    return null;
  }

  async loadAll(accountId: string): Promise<SurveyModel[]> {
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

  async loadById(id: string): Promise<SurveyModel> {
    const collection = MongoHelper.getCollection('surveys');
    const survey = await collection.findOne({
      _id: new ObjectId(id),
    });
    return survey && MongoHelper.map(survey);
  }
}
