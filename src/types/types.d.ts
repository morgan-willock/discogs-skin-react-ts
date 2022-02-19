import Type from './enums';

export interface DiscogsSearchParams {
  q: string,
  type: string,
  title: string,
  release_title: string,
  credit: string,
  artist: string,
  anv: string,
  label: string,
  genre: string,
  style: string,
  country: string,
  year: string,
  format: string,
  catno: string,
  barcode: string,
  track: string,
  submitter: string,
  contributor: string,
}

export interface DiscogsPaginationParams {
  page: number,
  per_page: number,
}

export interface Pagination {
  items: number,
  page: number,
  pages: number,
  per_page: number,
  urls: {
    last: string,
    next: string,
  }
}

export interface Community {
  want: number;
  have: number;
}

export interface Format {
  name: string;
  qty: string;
  descriptions: string[];
  text?: string;
}

export interface UserData {
  in_wantlist: boolean;
  in_collection: boolean;
}

export interface Result {
  id: number;
  type: Type;
  user_data: UserData;
  master_id: number | null;
  master_url: null | string;
  uri: string;
  title: string;
  thumb: string;
  cover_image: string;
  resource_url: string;
  country?: string;
  year?: string;
  format?:string[];
  label?: string[];
  genre?: string[];
  style?: string[];
  barcode?: string[];
  catno?: string;
  community?: Community;
  format_quantity?: number;
  formats?: Format[];
}
