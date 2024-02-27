import { HttpInterface } from "./interface";
import axios from "axios";

class Http implements HttpInterface {
  constructor(private baseUrl: string, private fetch: typeof axios) {}

  async get({ url, options }: { url: string; options?: any }) {
    try {
      const { data, status } = await this.fetch.get(
        `${this.baseUrl}${url}`,
        options
      );
      return { data, status };
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async post({
    url,
    options,
    data,
  }: {
    url: string;
    options?: any;
    data?: any;
  }) {
    try {
      const { data: responseData, status } = await this.fetch.post(
        `${this.baseUrl}${url}`,
        data,
        options
      );
      return { data: responseData, status };
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async put({
    url,
    options,
    data,
  }: {
    url: string;
    options?: any;
    data?: any;
  }) {
    try {
      const { data: responseData, status } = await this.fetch.put(
        `${this.baseUrl}${url}`,
        data,
        options
      );
      return { data: responseData, status };
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async delete({ url, options }: { url: string; options?: any }) {
    try {
      const { data: responseData, status } = await this.fetch.delete(
        `${this.baseUrl}${url}`,
        options
      );
      return { data: responseData, status };
    } catch (error) {
      return {
        error: error,
      };
    }
  }
}

export default Http;
