import { parseData, isEmpty } from './common';
import type { IBaseRendererProps, IRendererAppHelper, DataSource } from '../types';

export class DataHelper {
  private dataSource: DataSource;
  private appHelper: IRendererAppHelper;
  private parseFn: (data: any) => any;
  private dataSourceMap: Record<string, any> = {};

  constructor(
    private component: any,
    dataSource: DataSource,
    appHelper: IRendererAppHelper,
    parseFn: (data: any) => any
  ) {
    this.dataSource = dataSource;
    this.appHelper = appHelper;
    this.parseFn = parseFn;
  }

  getInitData(): Promise<any> {
    const { list = [] } = this.dataSource;
    if (isEmpty(list)) {
      return Promise.resolve({});
    }

    const promises = list.map((item) => this.handleDataSourceItem(item));
    return Promise.all(promises).then((results) => {
      const data: Record<string, any> = {};
      list.forEach((item, index) => {
        if (item.id) {
          data[item.id] = results[index];
        }
      });
      this.dataSourceMap = data;
      return data;
    });
  }

  private async handleDataSourceItem(item: any): Promise<any> {
    if (!item.options) {
      return {};
    }

    const options = this.parseFn(item.options);
    const { uri, method = 'GET', params, willFetch, didFetch } = options;

    if (!uri) {
      return {};
    }

    try {
      if (willFetch && typeof willFetch === 'string') {
        const willFetchFn = new Function('data', 'options', `return ${willFetch}`);
        const result = willFetchFn.call(this.component, {}, options);
        if (result) {
          await result;
        }
      }

      const response = await this.request(uri, method, params);
      
      if (didFetch && typeof didFetch === 'string') {
        const didFetchFn = new Function('data', 'options', 'response', `return ${didFetch}`);
        didFetchFn.call(this.component, {}, options, response);
      }

      return response;
    } catch (error) {
      console.error(`[DataHelper] Failed to fetch data for ${item.id}:`, error);
      return {};
    }
  }

  private async request(uri: string, method: string, params?: any): Promise<any> {
    const requestHandlersMap = this.appHelper?.requestHandlersMap;
    if (requestHandlersMap && typeof requestHandlersMap === 'object') {
      const handler = requestHandlersMap[uri];
      if (handler && typeof handler === 'function') {
        return handler({ uri, method, params });
      }
    }

    // Default fetch implementation
    const url = typeof uri === 'string' ? uri : String(uri);
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (params && (method === 'POST' || method === 'PUT')) {
      fetchOptions.body = JSON.stringify(params);
    }

    const response = await fetch(url, fetchOptions);
    return response.json();
  }

  updateConfig(dataSource: DataSource): Record<string, any> {
    this.dataSource = dataSource;
    this.getInitData().then((data) => {
      this.dataSourceMap = data;
    });
    return this.dataSourceMap;
  }
}
