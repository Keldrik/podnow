import { ObjectId } from 'mongodb';

export interface enclosure {
  filesize: number;
  type: string;
  url: string;
}

export interface chapter {
  start: number;
  title: string;
}

export interface episode {
  _id: ObjectId;
  guid: string;
  title: string;
  published: Date;
  duration: number;
  summary: string;
  subtitle: string;
  description: string;
  enclosure: enclosure;
  image: string;
  podcastId: ObjectId;
  podcastUrl: string;
  podlistUrl: string;
  content: string;
  chapters: chapter[];
}
