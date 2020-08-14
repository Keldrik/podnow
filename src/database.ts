import { MongoClient, Db } from 'mongodb';

const url: string = 'mongodb://localhost:27017';
const dbName: string = 'podmo';

let cachedDb: Db = null;

export default async (): Promise<Db> => {
  if (!cachedDb) {
    const client: MongoClient = new MongoClient(url, {
      poolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    cachedDb = await client.db(dbName);
  }
  return cachedDb;
};
