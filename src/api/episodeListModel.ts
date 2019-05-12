import { episode } from './episodeModel';

export interface episodeList {
  episodes: episode[];
  allCount: number;
  pageSize: number;
  page: number;
  lastPage: number;
}
