import { Collection, MongoClient, ObjectId, ReturnDocument } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    try {
      this.client = await MongoClient.connect(this.uri);
    } catch (e) {
      console.error(e);
    }
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  /**
   * Overrides default mongodb insertOne behaviour
   * Returns inserted document instead
   * of mongodb acknowledge object
   *
   * @param collection Collection to insert document
   * @param data Document to insert
   * @returns Inserted Document
   */
  async insertOne(collection, data) {
    const coll = this.getCollection(collection);
    const options = { upsert: true, returnDocument: ReturnDocument.AFTER };
    const { value: document } = await coll.findOneAndUpdate(
      { _id: new ObjectId() },
      { $setOnInsert: data },
      options
    );
    return document;
  },

  map(document) {
    const { _id: id, ...rest } = document;
    return { ...rest, id };
  },

  mapArray(documentList) {
    return documentList.map((d) => this.map(d));
  },
};
