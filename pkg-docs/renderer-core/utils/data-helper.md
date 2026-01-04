# DataHelper - 数据源管理

## 功能概述

[`utils/data-helper.ts`](../../packages/renderer-core/src/utils/data-helper.ts) 是数据源管理模块，负责管理数据源的加载、处理和缓存。它提供了完整的数据源管理能力，包括数据源配置、请求处理、数据缓存等。

## 主要功能

1. **数据源配置**：管理数据源配置
2. **数据源加载**：加载数据源数据
3. **数据源处理**：处理数据源数据
4. **数据源缓存**：缓存数据源数据
5. **请求处理**：处理数据源请求
6. **错误处理**：处理数据源错误

## 核心类

### DataHelper

数据源管理类，提供数据源管理功能。

```typescript
export class DataHelper {
  host: any;
  config: DataSource;
  parser: any;
  ajaxList: any[];
  ajaxMap: any;
  dataSourceMap: any;
  appHelper: IRendererAppHelper;

  constructor(comp: any, config: DataSource, appHelper: IRendererAppHelper, parser: any) {
    this.host = comp;
    this.config = config || {};
    this.parser = parser;
    this.ajaxList = config?.list || [];
    this.ajaxMap = transformArrayToMap(this.ajaxList, 'id');
    this.dataSourceMap = this.generateDataSourceMap();
    this.appHelper = appHelper;
  }

  updateConfig(config = {}) {
    this.config = config as DataSource;
    this.ajaxList = (config as DataSource)?.list || [];
    const ajaxMap: any = transformArrayToMap(this.ajaxList, 'id');
    // 删除已经移除的接口
    Object.keys(this.ajaxMap).forEach((key) => {
      if (!ajaxMap[key]) {
        delete this.dataSourceMap[key];
      }
    });
    this.ajaxMap = ajaxMap;
    // 添加未加入到dataSourceMap中的接口
    this.ajaxList.forEach((item) => {
      if (!this.dataSourceMap[item.id]) {
        this.dataSourceMap[item.id] = {
          status: DS_STATUS.INIT,
          load: (...args: any) => {
            return this.getDataSource(item.id, ...args);
          },
        };
      }
    });
    return this.dataSourceMap;
  }

  generateDataSourceMap() {
    const res: any = {};
    this.ajaxList.forEach((item) => {
      res[item.id] = {
        status: DS_STATUS.INIT,
        load: (...args: any) => {
          return this.getDataSource(item.id, ...args);
        },
      };
    });
    return res;
  }

  updateDataSourceMap(id: string, data: any, error: any) {
    this.dataSourceMap[id].error = error || undefined;
    this.dataSourceMap[id].data = data;
    this.dataSourceMap[id].status = error ? DS_STATUS.ERROR : DS_STATUS.LOADED;
  }

  getInitDataSourseConfigs() {
    const initConfigs = this.parser(this.ajaxList).filter((item: DataSourceItem) => {
      if (item.isInit === true) {
        this.dataSourceMap[item.id].status = DS_STATUS.LOADING;
        return true;
      }
      return false;
    });
    return initConfigs;
  }

  getInitData() {
    const initSyncData = this.getInitDataSourseConfigs();
    return this.asyncDataHandler(initSyncData).then((res) => {
      const { dataHandler } = this.config;
      return this.handleData(null, dataHandler, res, null);
    });
  }

  getDataSource(id: string, params: any, otherOptions: any, callback: any) {
    const req = this.parser(this.ajaxMap[id]);
    const options = req.options || {};
    let callbackFn = callback;
    let otherOptionsObj = otherOptions;
    if (typeof otherOptions === 'function') {
      callbackFn = otherOptions;
      otherOptionsObj = {};
    }
    const { headers, ...otherProps } = otherOptionsObj || {};
    if (!req) {
      logger.warn(`getDataSource API named ${id} not exist`);
      return;
    }

    return this.asyncDataHandler([
      {
        ...req,
        options: {
          ...options,
          params:
            Array.isArray(options.params) || Array.isArray(params)
              ? params || options.params
              : {
                ...options.params,
                ...params,
              },
          headers: {
            ...options.headers,
            ...headers,
          },
          ...otherProps,
        },
      },
    ])
    .then((res: any) => {
      try {
        callbackFn && callbackFn(res && res[id]);
      } catch (e) {
        logger.error('load请求回调函数报错', e);
      }
      return res && res[id];
    })
    .catch((err) => {
      try {
        callbackFn && callbackFn(null, err);
      } catch (e) {
        logger.error('load请求回调函数报错', e);
      }
      return err;
    });
  }

  asyncDataHandler(asyncDataList: any[]) {
    return new Promise((resolve, reject) => {
      const allReq: any[] = [];
      asyncDataList.forEach((req) => {
        const { id, type } = req;
        if (!id || !type || type === 'legao') {
          return;
        }
        allReq.push(req);
      });

      if (allReq.length === 0) {
        resolve({});
      }
      const res: any = {};
      Promise.all(
        allReq.map((item: any) => {
          return new Promise((innerResolve) => {
            const { type, id, dataHandler, options } = item;

            const fetchHandler = (data: any, error: any) => {
              res[id] = this.handleData(id, dataHandler, data, error);
              this.updateDataSourceMap(id, res[id], error);
              innerResolve({});
            };

            const doFetch = (innerType: string, innerOptions: any) => {
              doRequest(innerType as any, innerOptions)
                ?.then((data: any) => {
                  fetchHandler(data, undefined);
                })
                .catch((err: Error) => {
                  fetchHandler(undefined, err);
                });
            };

            this.dataSourceMap[id].status = DS_STATUS.LOADING;
            doFetch(type, options);
          });
        }),
      ).then(() => {
        resolve(res);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  handleData(id: string | null, dataHandler: any, data: any, error: any) {
    let dataHandlerFun = dataHandler;
    if (isJSFunction(dataHandler)) {
      dataHandlerFun = transformStringToFunction(dataHandler.value);
    }
    if (!dataHandlerFun || typeof dataHandlerFun !== 'function') {
      return data;
    }
    try {
      return dataHandlerFun.call(this.host, data, error);
    } catch (e) {
      if (id) {
        logger.error(`[${id}]单个请求数据处理函数运行出错`, e);
      } else {
        logger.error('请求数据处理函数运行出错', e);
      }
    }
  }
}
```

**属性说明：**

| 属性 | 类型 | 说明 |
|------|------|------|
| host | any | 主机对象，执行 dataHandler 时的 "this" 对象 |
| config | DataSource | 数据源配置 |
| parser | any | 解析器函数，用于处理配置数据 |
| ajaxList | any[] | 数据源列表 |
| ajaxMap | any | 数据源映射 |
| dataSourceMap | any | 数据源映射 |
| appHelper | IRendererAppHelper | 应用助手 |

**方法说明：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| constructor | comp, config, appHelper, parser | void | 构造函数 |
| updateConfig | config | any | 更新配置 |
| generateDataSourceMap | - | any | 生成数据源映射 |
| updateDataSourceMap | id, data, error | void | 更新数据源映射 |
| getInitDataSourseConfigs | - | any[] | 获取初始化数据源配置 |
| getInitData | - | Promise<any> | 获取初始化数据 |
| getDataSource | id, params, otherOptions, callback | Promise<any> | 获取数据源 |
| asyncDataHandler | asyncDataList | Promise<any> | 异步数据处理 |
| handleData | id, dataHandler, data, error | any | 处理数据 |

**说明：**
- 提供完整的数据源管理功能
- 支持数据源配置、加载、处理、缓存
- 支持请求处理和错误处理
- 支持数据处理器

## 核心函数

### doRequest

执行数据源请求。

```typescript
export function doRequest(type: DataSourceType, options: any)
```

**参数：**
- `type: DataSourceType` - 数据源类型（fetch/jsonp）
- `options: any` - 请求选项

**返回值：** `Promise<any>` - 请求结果

**说明：**
- 执行数据源请求
- 支持 fetch 和 jsonp 两种类型

**使用示例：**

```typescript
import { doRequest } from '@alilc/lowcode-renderer-core';

doRequest('fetch', {
  uri: 'https://api.example.com/data',
  method: 'GET',
  params: {
    id: 1,
  },
}).then((data) => {
  console.log(data);
});
```

## 使用示例

### 基础使用

```typescript
import { DataHelper } from '@alilc/lowcode-renderer-core';

const dataHelper = new DataHelper(
  component,
  {
    list: [{
      id: 'user',
      isInit: true,
      type: 'fetch',
      options: {
        uri: 'https://api.example.com/user',
        method: 'GET',
      },
      dataHandler: 'this.handleUserData',
    }],
  },
  appHelper,
  parser
);

dataHelper.getInitData().then((data) => {
  console.log(data);
});
```

### 获取数据源

```typescript
import { DataHelper } from '@alilc/lowcode-renderer-core';

const dataHelper = new DataHelper(component, config, appHelper, parser);

dataHelper.getDataSource('user', { id: 1 }).then((data) => {
  console.log(data);
});
```

### 更新配置

```typescript
import { DataHelper } from '@alilc/lowcode-renderer-core';

const dataHelper = new DataHelper(component, config, appHelper, parser);

dataHelper.updateConfig({
  list: [{
    id: 'user',
    isInit: true,
    type: 'fetch',
    options: {
      uri: 'https://api.example.com/user',
      method: 'GET',
    },
  }],
});
```

### 数据处理器

```typescript
import { DataHelper } from '@alilc/lowcode-renderer-core';

const dataHelper = new DataHelper(
  component,
  {
    list: [{
      id: 'user',
      isInit: true,
      type: 'fetch',
      options: {
        uri: 'https://api.example.com/user',
        method: 'GET',
      },
      dataHandler: {
        type: 'JSFunction',
        value: 'function(data) { return data.user; }',
      },
    }],
  },
  appHelper,
  parser
);
```

## 注意事项

1. **数据源配置**：数据源配置需要正确设置
2. **请求类型**：支持 fetch 和 jsonp 两种类型
3. **数据处理器**：数据处理器需要正确设置
4. **错误处理**：提供友好的错误信息
5. **性能优化**：注意数据源加载的性能优化
6. **内存管理**：注意数据源缓存的内存管理
7. **并发控制**：注意并发请求的控制
8. **数据缓存**：注意数据源缓存的更新

## 相关文件

- [`../renderer/base.tsx`](../renderer/base.md) - 基础渲染器
- [`./common.ts`](common.md) - 通用工具函数
- [`./request.ts`](request.md) - 请求工具

## 外部依赖

- `@alilc/lowcode-utils`: 工具函数
- `@alilc/lowcode-types`: 类型定义

## 典型使用场景

1. **数据源加载**：加载数据源数据
2. **数据源处理**：处理数据源数据
3. **数据源缓存**：缓存数据源数据
4. **请求处理**：处理数据源请求
5. **错误处理**：处理数据源错误
