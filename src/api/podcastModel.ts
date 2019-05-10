import { ObjectId } from 'mongodb';

export interface owner {
  name: string;
  email: string;
}

export interface podcast {
  _id: ObjectId;
  categories: string[];
  title: string;
  link: string;
  updated: Date;
  ttl: number;
  language: string;
  description: string;
  subtitle: string;
  owner: owner;
  author: string;
  image: string;
  feed: string;
  podlistUrl: string;
  podlistImage: string;
}
