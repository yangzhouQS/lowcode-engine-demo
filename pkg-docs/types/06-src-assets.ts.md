# src/assets.ts - 资源类型定义

## 文件路径
`packages/types/src/assets.ts`

## 文件概述
定义了资源（Assets）相关的类型，用于描述和管理低代码引擎中的静态资源。这些类型定义了资源的级别、类型、加载方式等信息，支持 JS、CSS 等多种资源类型。

## 功能说明

### 主要职责
1. **资源级别定义**: 定义不同级别的资源（环境依赖、基础库、主题、运行时、组件、应用）
2. **资源类型定义**: 定义不同类型的资源（JS URL、CSS URL、CSS 文本、JS 文本、Bundle）
3. **资源加载**: 描述资源的加载方式和内容
4. **资源管理**: 支持资源的组织和管理

## 类型定义详解

### 1. AssetLevel
资源级别枚举，定义了资源的优先级和加载顺序。

```typescript
export enum AssetLevel {
  // 环境依赖库 比如 react, react-dom
  Environment = 1,
  // 基础类库，比如 lodash deep fusion antd
  Library = 2,
  // 主题
  Theme = 3,
  // 运行时
  Runtime = 4,
  // 业务组件
  Components = 5,
  // 应用 & 页面
  App = 6,
}
```

**资源级别说明**:

#### Environment (1) - 环境依赖库
- **说明**: 基础环境依赖，如 React、React-DOM
- **示例**: `react`, `react-dom`, `react-router-dom`
- **加载顺序**: 最先加载
- **使用场景**:
  - 框架核心库
  - 基础运行时依赖
  - 必须最先加载的资源

#### Library (2) - 基础类库
- **说明**: 基础类库，如 Lodash、Deep、Fusion、Ant Design
- **示例**: `lodash`, `antd`, `@alifd/next`
- **加载顺序**: 在环境依赖之后加载
- **使用场景**:
  - 工具库
  - UI 组件库
  - 基础功能库

#### Theme (3) - 主题
- **说明**: 主题样式资源
- **示例**: `@alifd/theme-design-pro`, 自定义主题 CSS
- **加载顺序**: 在基础类库之后加载
- **使用场景**:
  - UI 主题
  - 样式变量
  - 主题配置

#### Runtime (4) - 运行时
- **说明**: 运行时资源
- **示例**: 低代码引擎运行时、渲染器
- **加载顺序**: 在主题之后加载
- **使用场景**:
  - 低代码引擎
  - 渲染器
  - 运行时工具

#### Components (5) - 业务组件
- **说明**: 业务组件资源
- **示例**: 自定义业务组件、第三方组件库
- **加载顺序**: 在运行时之后加载
- **使用场景**:
  - 业务组件
  - 自定义组件
  - 组件库

#### App (6) - 应用 & 页面
- **说明**: 应用和页面资源
- **示例**: 页面代码、应用入口
- **加载顺序**: 最后加载
- **使用场景**:
  - 页面代码
  - 应用入口
  - 业务逻辑

**使用场景**:
- 控制资源加载顺序
- 优化资源加载性能
- 管理资源依赖关系

### 2. AssetLevels
资源级别数组，按优先级排序。

```typescript
export const AssetLevels = [
  AssetLevel.Environment,
  AssetLevel.Library,
  AssetLevel.Theme,
  AssetLevel.Runtime,
  AssetLevel.Components,
  AssetLevel.App,
];
```

**使用场景**:
- 按优先级加载资源
- 遍历所有资源级别
- 资源排序

### 3. URL
URL 类型别名。

```typescript
export type URL = string;
```

**使用场景**:
- 定义资源 URL
- 支持相对路径和绝对路径
- 支持不同协议（http、https、data 等）

### 4. AssetType
资源类型枚举，定义了不同类型的资源。

```typescript
export enum AssetType {
  JSUrl = 'jsUrl',      // JS URL
  CSSUrl = 'cssUrl',    // CSS URL
  CSSText = 'cssText',  // CSS 文本
  JSText = 'jsText',    // JS 文本
  Bundle = 'bundle',    // Bundle
}
```

**资源类型说明**:

#### JSUrl - JS URL
- **说明**: JavaScript 文件的 URL
- **示例**: `"https://cdn.example.com/react.js"`
- **使用场景**:
  - 加载外部 JS 文件
  - CDN 资源
  - 远程脚本

#### CSSUrl - CSS URL
- **说明**: CSS 文件的 URL
- **示例**: `"https://cdn.example.com/styles.css"`
- **使用场景**:
  - 加载外部 CSS 文件
  - CDN 样式
  - 远程样式表

#### CSSText - CSS 文本
- **说明**: CSS 文本内容
- **示例**: `".container { color: red; }"`
- **使用场景**:
  - 内联 CSS
  - 动态样式
  - 样式字符串

#### JSText - JS 文本
- **说明**: JavaScript 文本内容
- **示例**: `"console.log('Hello World');"`
- **使用场景**:
  - 内联 JS
  - 动态脚本
  - 代码字符串

#### Bundle - Bundle
- **说明**: 打包的资源集合
- **示例**: 包含多个资源的 Bundle
- **使用场景**:
  - 打包资源
  - 资源集合
  - 批量加载

### 5. AssetItem
单个资源项接口。

```typescript
export interface AssetItem {
  type: AssetType;                    // 资源类型
  content?: string | null;            // 资源内容
  device?: string;                    // 设备类型
  level?: AssetLevel;                 // 资源级别
  id?: string;                       // 资源 ID
  scriptType?: string;               // 脚本类型
}
```

**字段详细说明**:

#### type
- **类型**: `AssetType`
- **必填**: 是
- **说明**: 资源类型
- **示例**: `AssetType.JSUrl`, `AssetType.CSSUrl`
- **使用场景**:
  - 标识资源类型
  - 决定加载方式
  - 类型检查

#### content
- **类型**: `string | null`
- **必填**: 否
- **说明**: 资源内容
- **示例**: URL 字符串、CSS 文本、JS 文本
- **使用场景**:
  - 存储 URL
  - 存储文本内容
  - 资源数据

#### device
- **类型**: `string`
- **必填**: 否
- **说明**: 设备类型
- **示例**: `"mobile"`, `"desktop"`, `"tablet"`
- **使用场景**:
  - 响应式资源
  - 设备特定资源
  - 自适应加载

#### level
- **类型**: `AssetLevel`
- **必填**: 否
- **说明**: 资源级别
- **示例**: `AssetLevel.Environment`, `AssetLevel.Components`
- **使用场景**:
  - 控制加载顺序
  - 资源优先级
  - 依赖管理

#### id
- **类型**: `string`
- **必填**: 否
- **说明**: 资源唯一标识
- **示例**: `"react-18.0.0"`, `"antd-5.0.0"`
- **使用场景**:
  - 资源标识
  - 去重
  - 缓存管理

#### scriptType
- **类型**: `string`
- **必填**: 否
- **说明**: 脚本类型
- **示例**: `"module"`, `"text/javascript"`
- **使用场景**:
  - 指定脚本类型
  - ES Module 支持
  - 脚本加载方式

### 6. AssetList
资源列表类型。

```typescript
export type AssetList = Array<Asset | undefined | null>;
```

**使用场景**:
- 定义资源列表
- 支持可选资源
- 批量资源管理

### 7. Asset
资源类型，可以是多种形式。

```typescript
export type Asset = AssetList | AssetBundle | AssetItem | URL;
```

**资源形式说明**:

- **AssetList**: 资源列表，包含多个资源
- **AssetBundle**: 资源包，打包的资源集合
- **AssetItem**: 单个资源项
- **URL**: 简单的 URL 字符串

**使用场景**:
- 灵活的资源定义
- 支持多种资源形式
- 简化资源配置

### 8. AssetBundle
资源包接口。

```typescript
export interface AssetBundle {
  type: AssetType.Bundle;           // 资源类型为 Bundle
  level?: AssetLevel;               // 资源级别
  assets?: Asset | AssetList | null; // 包含的资源
}
```

**字段详细说明**:

#### type
- **类型**: `AssetType.Bundle`
- **必填**: 是
- **说明**: 资源类型为 Bundle
- **使用场景**:
  - 标识为资源包
  - 类型检查
  - 资源分类

#### level
- **类型**: `AssetLevel`
- **必填**: 否
- **说明**: 资源级别
- **使用场景**:
  - 控制加载顺序
  - 资源优先级
  - 依赖管理

#### assets
- **类型**: `Asset | AssetList | null`
- **必填**: 否
- **说明**: 包含的资源
- **使用场景**:
  - 打包多个资源
  - 资源集合
  - 批量加载

## 使用示例

### 基本资源项
```typescript
import { AssetItem, AssetType, AssetLevel } from '@alilc/lowcode-types';

const jsAsset: AssetItem = {
  type: AssetType.JSUrl,
  content: 'https://cdn.example.com/react.js',
  level: AssetLevel.Environment,
  id: 'react-18.0.0'
};

const cssAsset: AssetItem = {
  type: AssetType.CSSUrl,
  content: 'https://cdn.example.com/styles.css',
  level: AssetLevel.Theme,
  id: 'theme-1.0.0'
};
```

### 内联资源
```typescript
const inlineCssAsset: AssetItem = {
  type: AssetType.CSSText,
  content: '.container { color: red; }',
  level: AssetLevel.Theme
};

const inlineJsAsset: AssetItem = {
  type: AssetType.JSText,
  content: 'console.log("Hello World");',
  level: AssetLevel.Runtime
};
```

### 资源列表
```typescript
import { AssetList } from '@alilc/lowcode-types';

const assetList: AssetList = [
  {
    type: AssetType.JSUrl,
    content: 'https://cdn.example.com/react.js',
    level: AssetLevel.Environment
  },
  {
    type: AssetType.JSUrl,
    content: 'https://cdn.example.com/antd.js',
    level: AssetLevel.Library
  },
  {
    type: AssetType.CSSUrl,
    content: 'https://cdn.example.com/styles.css',
    level: AssetLevel.Theme
  }
];
```

### 资源包
```typescript
import { AssetBundle } from '@alilc/lowcode-types';

const assetBundle: AssetBundle = {
  type: AssetType.Bundle,
  level: AssetLevel.Components,
  assets: [
    {
      type: AssetType.JSUrl,
      content: 'https://cdn.example.com/button.js',
      level: AssetLevel.Components
    },
    {
      type: AssetType.JSUrl,
      content: 'https://cdn.example.com/input.js',
      level: AssetLevel.Components
    }
  ]
};
```

### 简单 URL 资源
```typescript
import { Asset } from '@alilc/lowcode-types';

const simpleAsset: Asset = 'https://cdn.example.com/react.js';
```

### 设备特定资源
```typescript
const mobileAsset: AssetItem = {
  type: AssetType.CSSUrl,
  content: 'https://cdn.example.com/mobile.css',
  level: AssetLevel.Theme,
  device: 'mobile'
};

const desktopAsset: AssetItem = {
  type: AssetType.CSSUrl,
  content: 'https://cdn.example.com/desktop.css',
  level: AssetLevel.Theme,
  device: 'desktop'
};
```

### ES Module 资源
```typescript
const moduleAsset: AssetItem = {
  type: AssetType.JSUrl,
  content: 'https://cdn.example.com/module.js',
  level: AssetLevel.Runtime,
  scriptType: 'module'
};
```

## 设计特点

### 1. 分级加载
- 按资源级别加载
- 优化加载性能
- 管理依赖关系

### 2. 多类型支持
- 支持 JS、CSS 等多种资源类型
- 支持 URL 和文本内容
- 灵活的资源定义

### 3. 灵活性
- 支持多种资源形式
- 支持可选资源
- 适应不同场景

### 4. 设备适配
- 支持设备特定资源
- 响应式资源加载
- 自适应体验

## 注意事项

1. **加载顺序**: 资源应该按照 AssetLevel 的顺序加载，确保依赖关系正确
2. **资源去重**: 使用 id 字段进行资源去重，避免重复加载
3. **设备适配**: 根据设备类型加载对应的资源，提升用户体验
4. **脚本类型**: 对于 ES Module，需要设置 scriptType 为 'module'
5. **内容格式**: 对于 CSSText 和 JSText，确保内容格式正确

## 相关文件

- [`index.ts`](./01-src-index.ts) - 模块入口
- [`shell/type/npm-info.ts`](./shell/type/npm-info.ts) - NPM 信息类型

## 版本历史

- **v1.3.2**: 当前版本，包含资源类型定义

## 使用建议

1. **资源分级**: 合理设置资源级别，确保加载顺序正确
2. **资源去重**: 使用 id 字段进行资源去重，避免重复加载
3. **CDN 优化**: 对于常用资源，使用 CDN 加速加载
4. **按需加载**: 根据设备类型加载对应的资源
5. **缓存管理**: 合理设置资源 id，利用浏览器缓存

## 扩展功能

可以基于这些类型实现以下功能：

1. **资源加载器**: 自动加载和管理资源
2. **资源预加载**: 预加载关键资源
3. **资源缓存**: 缓存已加载的资源
4. **资源监控**: 监控资源加载状态
5. **资源优化**: 压缩和优化资源
