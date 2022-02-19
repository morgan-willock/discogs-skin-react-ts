import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from './axios';
import {
  Result,
  Pagination,
  DiscogsSearchParams,
  DiscogsPaginationParams,
} from '../types/types';

const discogsClient = {
  search: async (queryParams: Partial<DiscogsSearchParams | DiscogsPaginationParams>) => {
    const config: AxiosRequestConfig = {
      params: queryParams,
    };
    const response: AxiosResponse = await axios.get('/database/search', config);
    const responseData: { pagination: Pagination, results: Result[] } = response.data;
    return responseData;
  },
};

export default discogsClient;
