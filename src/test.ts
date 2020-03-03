import { parse } from 'url';

const podcastRandom = require('./api/podcastRandom');
const podcastAll = require('./api/podcastAll');
const podcastSingle = require('./api/podcastSingle');
const episodePodcast = require('./api/episodePodcast');
const episodeSingle = require('./api/episodeSingle');
const episodeAll = require('./api/episodeAll');
import http, { IncomingMessage, ServerResponse } from 'http';

const routes: any = {
  '/podcastrandom': podcastRandom,
  '/podcastall': podcastAll,
  '/podcastsingle': podcastSingle,
  '/episodepodcast': episodePodcast,
  '/episodesingle': episodeSingle,
  '/episodeall': episodeAll
};

http
  .createServer(async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const { pathname } = parse(req.url, true);
      console.log(`Request with path: ${pathname}`);
      await routes[pathname](req, res);
    } catch (err) {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(3009);
