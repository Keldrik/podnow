import helper from '../helper';
import { Collection, Db } from 'mongodb';
import { IncomingMessage, ServerResponse } from 'http';
import apiHandler from '../apiHandler';
import { podcast } from './podcastModel';

const apiId: string = 'podcastRandom';

const getData = async (db: Db): Promise<podcast> => {
  const podcasts: Collection<podcast> = db.collection('podcasts');
  const max: number = await podcasts.countDocuments();
  const random: number = helper.getRandomNumber(max);
  const pod: podcast[] = await podcasts
    .find({}, { maxTimeMS: 2000 })
    .skip(random)
    .limit(1)
    .toArray();
  return pod[0];
};

module.exports = async (req: IncomingMessage, res: ServerResponse) => {
  await apiHandler(req, res, apiId, getData);
};
