import { SaveSurveyResultModel, SaveSurveyResultRepository, SurveyResultModel } from '@/data/usecases/surveyResult/saveSurveyResult/DbSaveSurveyResultProtocols';
import { ObjectId } from 'mongodb';
import { MongoHelper, QueryBuilder } from '../helpers';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await MongoHelper.getCollection('surveyResults');
    await MongoHelper.collection.findOneAndUpdate({
      surveyId: new ObjectId(data.surveyId),
      accountId: new ObjectId(data.accountId),
    }, {
      $set: { answer: data.answer, date: data.date },
    }, {
      upsert: true,
    });
    const surveyResult = await this.loadBySurveyId(data.surveyId);
    return surveyResult;
  }

  private async loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
    await MongoHelper.getCollection('surveyResults');

    const aggregate = new QueryBuilder()
      .match({ surveyId: new ObjectId(surveyId) })
      .group({
        _id: 0,
        data: {
          $push: '$$ROOT',
        },
        count: {
          $sum: 1,
        },
      })
      .unwind({ path: '$data' })
      .lookup({
        from: 'surveys',
        localField: 'data.surveyId',
        foreignField: '_id',
        as: 'survey',
      })
      .unwind({ path: '$survey' })
      .group({
        _id: {
          surveyId: '$survey._id',
          question: '$survey.question',
          date: '$survey.date',
          total: '$count',
          answer: {
            $filter: {
              input: '$survey.answers',
              as: 'item',
              cond: {
                $eq: ['$$item.answer', '$data.answer'],
              },
            },
          },
        },
        count: {
          $sum: 1,
        },
      })
      .unwind({ path: '$_id.answer' })
      .addFields({
        '_id.answer.count': '$count',
        '_id.answer.percent': {
          $multiply: [
            { $divide: ['$count', '$_id.total'] },
            100,
          ],
        },
      })
      .group({
        _id: {
          surveyId: '$_id.surveyId',
          question: '$_id.question',
          date: '$_id.date',
        },
        answers: {
          $push: '$_id.answer',
        },
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: '$answers',
      })
      .build();

    const surveyResult = await MongoHelper.collection.aggregate(aggregate).toArray();
    return surveyResult.length && MongoHelper.map(surveyResult[0]);
  }

}