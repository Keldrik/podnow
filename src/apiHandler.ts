import helper from './helper';
import { IncomingMessage, ServerResponse } from 'http';

export default async (
  req: IncomingMessage,
  res: ServerResponse,
  apiId: string,
  dataFunc: any,
  ...para: any
) => {
  if (helper.getCache(apiId)) {
    helper.jsonResponse(res, helper.getCache(apiId));
    console.log(`${apiId} cache`);
    return;
  }
  try {
    console.time(`${apiId} db`);
    const data: any = await dataFunc(...para);
    console.timeEnd(`${apiId} db`);
    helper.setCache(apiId, data);
    helper.jsonResponse(res, data);
  } catch (err) {
    console.log(err);
    res.end();
  }
};
