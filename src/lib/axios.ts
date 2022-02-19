import Axios, { AxiosRequestConfig } from 'axios';

const axios = Axios.create({
  baseURL: 'https://api.discogs.com',
});

/* eslint-disable no-param-reassign */
function authRequestInterceptor(config: AxiosRequestConfig) {
  config.params = {
    ...config.params,
    token: process.env.REACT_APP_DISCOGS_TOKEN,
  };
  return config;
}

axios.interceptors.request.use(authRequestInterceptor);

export default axios;
