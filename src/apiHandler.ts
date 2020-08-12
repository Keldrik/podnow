import helper from './helper';
import database from './database';
import { IncomingMessage, ServerResponse } from 'http';

export default async (
  req: IncomingMessage,
  res: ServerResponse,
  apiId: string,
  dataFunc: any,
  ...para: any
) => {
  try {
    const db = await database();
    const data: any = await dataFunc(db, ...para);
    helper.jsonResponse(res, data);
  } catch (err) {
    res.writeHead(500);
    res.end();
  }
};
