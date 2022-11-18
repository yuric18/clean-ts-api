import {
  AddSurveyRepository,
  LoadSurveyByIdRepository,
  LoadSurveysRepository,
} from '@/data';
import { MongoHelper, QueryBuilder } from './helpers';

import { AddSurveyParams, SurveyModel } from '@/domain';
import { ObjectId } from 'mongodb';

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository
{
  async add(survey: AddSurveyParams): Promise<void> {
    await MongoHelper.getCollection('surveys');
    await MongoHelper.insert(survey);
    return null;
  }

  async loadAll(accountId: string): Promise<SurveyModel[]> {
    await MongoHelper.getCollection('surveys');

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

    const surveys = await MongoHelper.collection.aggregate(query).toArray();
    return MongoHelper.mapArray(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    await MongoHelper.getCollection('surveys');
    const survey = await MongoHelper.collection.findOne({
      _id: new ObjectId(id),
    });
    return survey && MongoHelper.map(survey);
  }
}
