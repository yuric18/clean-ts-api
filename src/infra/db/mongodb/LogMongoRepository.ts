import { LogErrorRepository } from '@/data';
import { MongoHelper } from './helpers';

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const collection = MongoHelper.getCollection('errors');
    await collection.insertOne({
      stack,
      date: new Date(),
    });
  }
}
