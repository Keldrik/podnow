import { Collection, Db } from 'mongodb';
import { IncomingMessage, ServerResponse } from 'http';
import apiHandler from '../apiHandler';
import { parse } from 'url';
import { podcast } from './podcastModel';

const apiId: string = 'podcastSingle';

const getData = async (db: Db, podlisturl: string): Promise<podcast> => {
  const podcasts: Collection<podcast> = db.collection('podcasts');
  return await podcasts.findOne({ podlistUrl: podlisturl });
};

module.exports = async (req: IncomingMessage, res: ServerResponse) => {
  const { query } = parse(req.url, true);
  const { podlisturl = 'xxxnullxxx' } = query;
  await apiHandler(req, res, `${apiId}-${podlisturl}`, getData, podlisturl);
};
