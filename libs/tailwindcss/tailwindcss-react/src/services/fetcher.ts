import { AxiosRequestConfig } from 'axios';
import api from './api';

export default (url: string, config?: AxiosRequestConfig) =>
  api.get(url, config).then((res) => res.data);
