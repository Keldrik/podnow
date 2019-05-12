import { podcast } from './podcastModel';

export interface podcastList {
  podcasts: podcast[];
  allCount: number;
  pageSize: number;
  page: number;
  lastPage: number;
}
