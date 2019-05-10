import { MongoClient, Db } from 'mongodb';

let isConnected: boolean = false;
const url: string = process.env.MONGOURL;
const dbName: string = process.env.DBNAME;
const client: MongoClient = new MongoClient(url, { useNewUrlParser: true });

export default async (): Promise<Db> => {
  if (isConnected) {
    console.log('[MongoDB] Using existing connection.');
    return client.db(dbName);
  }
  try {
    await client.connect();
    console.log('[MongoDB] Created new connection.');
    isConnected = true;
    return client.db(dbName);
  } catch (err) {
    console.error(err);
    return null;
  }
};
