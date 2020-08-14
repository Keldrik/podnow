import { Collection, Db } from 'mongodb';
import { IncomingMessage, ServerResponse } from 'http';
import apiHandler from '../apiHandler';
import { parse } from 'url';
import { podcast } from './podcastModel';
import { podcastList } from './podcastListModel';

const apiId: string = 'podcastAll';
const pageSize: number = 12;

const getData = async (db: Db, page: number): Promise<podcastList> => {
  const podcasts: Collection<podcast> = db.collection('podcasts');
  let skip: number = 0;
  if (page > 1) skip = (page - 1) * pageSize;
  const podcastData = await podcasts.find();
  const podcastCount = await podcastData.count();
  if (page > Math.ceil(podcastCount / pageSize)) return null;
  const result: podcastList = {
    podcasts: await podcastData
      .sort({ podlistUrl: 1 })
      .skip(skip)
      .limit(pageSize)
      .project({
        title: 1,
        updated: 1,
        subtitle: 1,
        author: 1,
        podlistUrl: 1,
        podlistImage: 1,
      })
      .toArray(),
    allCount: podcastCount,
    pageSize: pageSize,
    page: page,
    lastPage: Math.ceil(podcastCount / pageSize),
  };
  return result;
};

module.exports = async (req: IncomingMessage, res: ServerResponse) => {
  const { query } = parse(req.url, true);
  let page = 666666;
  if (query.page) {
    page = parseInt(query.page.toString());
  }
  await apiHandler(req, res, apiId, getData, page);
};
