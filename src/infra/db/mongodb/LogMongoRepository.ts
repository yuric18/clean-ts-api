import { LogErrorRepository } from '@/data';
import { MongoHelper } from './helpers';

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    await MongoHelper.getCollection('errors');
    await MongoHelper.collection.insertOne({
      stack,
      date: new Date(),
    });
  }
}
