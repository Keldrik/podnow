import database from '../database';
import { Collection, Db } from 'mongodb';
import { IncomingMessage, ServerResponse } from 'http';
import apiHandler from '../apiHandler';
import { parse } from 'url';
import { episode } from './episodeModel';

const apiId: string = 'episodeAll';
const pageSize: number = 12;

const getData = async (page: number): Promise<episode[]> => {
  const db: Db = await database();
  const episodes: Collection<episode> = db.collection('episodes');
  let skip: number = 0;
  if (page > 1) skip = (page - 1) * pageSize;
  return episodes
    .find()
    .sort({ published: -1 })
    .skip(skip)
    .limit(pageSize)
    .toArray();
};

module.exports = async (req: IncomingMessage, res: ServerResponse) => {
  const { query } = parse(req.url, true);
  const { page = 1 } = query;
  await apiHandler(req, res, apiId, getData, page);
};
