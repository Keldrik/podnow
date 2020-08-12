import { MongoClient, Db } from 'mongodb';

const url: string = process.env.MONGOURL;
const dbName: string = process.env.DBNAME;

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
