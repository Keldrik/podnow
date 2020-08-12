import { ServerResponse } from 'http';

function getRandomNumber(max: number): number {
  return Math.random() * max;
}

function jsonResponse(res: ServerResponse, obj: object): void {
  if (!obj) {
    res.writeHead(404);
    res.end();
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(obj));
    res.end();
  }
}

export = {
  getRandomNumber,
  jsonResponse,
};
