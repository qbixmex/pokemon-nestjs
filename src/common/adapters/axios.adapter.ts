import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';

import { HttpAdapter } from '../interfaces';

@Injectable()
export class AxiosAdapter implements HttpAdapter {

  private axios: AxiosInstance = axios;

  async get<T>(url: string, limit = 10, offset = 0): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(`${ url }/pokemon?limit=${ limit }&offset=${ offset }`);
      return data;
    } catch(error) {
      throw new Error('There was an error - Check Logs');
    }
  }

}