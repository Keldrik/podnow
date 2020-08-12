import database from '../database';
import { Collection, Db } from 'mongodb';
import { IncomingMessage, ServerResponse } from 'http';
import apiHandler from '../apiHandler';
import { parse } from 'url';
import { episode } from './episodeModel';

const apiId: string = 'episodeSingle';

const getData = async (
  db: Db,
  podcasturl: string,
  podlisturl: string
): Promise<episode> => {
  const episodes: Collection<episode> = db.collection('episodes');
  return await episodes.findOne({
    podlistUrl: podlisturl,
    podcastUrl: podcasturl,
  });
};

module.exports = async (req: IncomingMessage, res: ServerResponse) => {
  const { query } = parse(req.url, true);
  const { podlisturl = 'xxxnullxxx', podcasturl = 'xxxnullxxx' } = query;
  await apiHandler(
    req,
    res,
    `${apiId}-${podlisturl}`,
    getData,
    podcasturl,
    podlisturl
  );
};
