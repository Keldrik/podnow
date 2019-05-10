import { ServerResponse } from 'http';

const cache: any = {};
const cacheTime: number = 0;

function getRandomNumber(max: number): number {
  return Math.random() * max;
}

function jsonResponse(res: ServerResponse, obj: object): void {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(obj));
  res.end();
}

function getCache(id: string): object {
  const c = cache[id];
  if (!c) return null;
  let elapsed = Date.now().valueOf() - c.added.valueOf();
  elapsed /= 1000;
  const seconds = Math.round(elapsed);
  if (seconds >= cacheTime) return null;
  return c.obj;
}

function setCache(id: string, value: object): void {
  cache[id] = {
    added: new Date(),
    obj: value
  };
}

export = {
  getCache,
  setCache,
  getRandomNumber,
  jsonResponse
};
