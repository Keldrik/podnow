import database from '../database';
import { Collection, Db } from 'mongodb';
import { IncomingMessage, ServerResponse } from 'http';
import apiHandler from '../apiHandler';
import { parse } from 'url';
import { episode } from './episodeModel';
import { episodeList } from './episodeListModel';

const apiId: string = 'episodeAll';
const pageSize: number = 12;

const getData = async (page: number): Promise<episodeList> => {
  const db: Db = await database();
  const episodes: Collection<episode> = db.collection('episodes');
  let skip: number = 0;
  if (page > 1) skip = (page - 1) * pageSize;
  const episodeData = await episodes.find();
  const episodeCount = await episodeData.count();
  const result: episodeList = {
    episodes: await episodeData
      .sort({ published: -1 })
      .skip(skip)
      .limit(pageSize)
      .project({
        title: 1,
        published: 1,
        summary: 1,
        subtitle: 1,
        podcastUrl: 1,
        podcastTitle: 1,
        podlistUrl: 1,
        podcastImage: 1
      })
      .toArray(),
    allCount: episodeCount,
    pageSize: pageSize,
    page: page,
    lastPage: Math.ceil(episodeCount / pageSize)
  };
  return result;
};

module.exports = async (req: IncomingMessage, res: ServerResponse) => {
  const { query } = parse(req.url, true);
  let page = 1;
  if (query.page) {
    page = parseInt(query.page.toString());
  }
  await apiHandler(req, res, apiId, getData, page);
};
