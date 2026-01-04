# Ignitor 模块总览

## 目录

- [模块简介](#模块简介)
- [核心职责](#核心职责)
- [模块结构](#模块结构)
- [构建配置](#构建配置)
- [入口文件](#入口文件)
- [外部依赖](#外部依赖)
- [构建插件](#构建插件)
- [使用场景](#使用场景)
- [相关文档](#相关文档)

## 模块简介

Ignitor 模块是 LowCode Engine 的构建和启动模块，负责将引擎核心模块打包成可用的资源文件，为低代码编辑器提供启动支持。该模块主要用于本地调试和资源构建。

**包路径**: `packages/ignitor`

**包名**: `@alilc/lowcode-ignitor`

**版本**: 1.3.2

**描述**: 点火器，bootstrap lce project

## 核心职责

### 1. 资源打包构建
- 将 [`AliLowCodeEngine`](../../packages/engine/src/index.ts) 打包为 UMD 格式
- 将 [`ReactSimulatorRenderer`](../../packages/react-simulator-renderer/src/index.ts) 打包为 UMD 格式
- 生成可用于浏览器环境的资源文件

### 2. 外部依赖管理
- 配置外部依赖（React、ReactDOM、PropTypes 等）
- 避免重复打包公共库
- 减小打包体积

### 3. 本地开发调试
- 提供本地开发服务器
- 支持热更新和实时预览
- 便于引擎核心模块的调试

### 4. 版本管理
- 从 [`lerna.json`](../../lerna.json) 读取版本号
- 注入版本占位符到构建产物
- 保持版本一致性

## 模块结构

```
packages/ignitor/
├── public/
│   ├── favicon.png           # 网站图标
│   └── index.html            # 入口 HTML
├── babel.config.js           # Babel 配置
├── build.json               # 构建配置
├── build.plugin.js          # 自定义构建插件
├── jest.config.js           # Jest 测试配置
├── package.json             # 包配置
└── tsconfig.json            # TypeScript 配置
```

### 文件说明

| 文件 | 说明 |
|------|------|
| [`package.json`](../../packages/ignitor/package.json) | 包配置文件，定义依赖和脚本 |
| [`build.json`](../../packages/ignitor/build.json) | 构建配置文件，定义入口和构建选项 |
| [`build.plugin.js`](../../packages/ignitor/build.plugin.js) | 自定义 webpack 插件配置 |
| [`babel.config.js`](../../packages/ignitor/babel.config.js) | Babel 转译配置 |
| [`tsconfig.json`](../../packages/ignitor/tsconfig.json) | TypeScript 编译配置 |
| [`public/index.html`](../../packages/ignitor/public/index.html) | 开发服务器入口页面 |

## 构建配置

### build.json 配置

[`build.json`](../../packages/ignitor/build.json) 是构建配置文件，定义了以下关键配置：

#### 1. 入口文件

```json
{
  "entry": {
    "AliLowCodeEngine": "../engine/src/index.ts",
    "ReactSimulatorRenderer": "../react-simulator-renderer/src/index.ts"
  }
}
```

- **AliLowCodeEngine**: 引擎核心模块入口
- **ReactSimulatorRenderer**: React 模拟渲染器入口

#### 2. 开发服务器配置

```json
{
  "devServer": {
    "liveReload": false,
    "hot": false
  }
}
```

- `liveReload`: 禁用实时重载
- `hot`: 禁用热模块替换

#### 3. 库配置

```json
{
  "library": "[name]"
}
```

- 使用入口名称作为库名称
- 生成 UMD 格式的库

#### 4. 公共路径

```json
{
  "publicPath": "/"
}
```

- 设置资源加载的公共路径

#### 5. 外部依赖

```json
{
  "externals": {
    "react": "var window.React",
    "react-dom": "var window.ReactDOM",
    "prop-types": "var window.PropTypes",
    "@alifd/next": "var window.Next",
    "rax": "var window.Rax",
    "@alilc/lowcode-engine": "var window.AliLowCodeEngine",
    "@alilc/lowcode-engine-ext": "var window.AliLowCodeEngineExt",
    "moment": "var moment",
    "lodash": "var _"
  }
}
```

将以下依赖外部化，从全局变量加载：

| 依赖 | 全局变量 |
|------|----------|
| react | window.React |
| react-dom | window.ReactDOM |
| prop-types | window.PropTypes |
| @alifd/next | window.Next |
| rax | window.Rax |
| @alilc/lowcode-engine | window.AliLowCodeEngine |
| @alilc/lowcode-engine-ext | window.AliLowCodeEngineExt |
| moment | moment |
| lodash | _ |

#### 6. 构建插件

```json
{
  "plugins": [
    ["build-plugin-react-app"],
    ["build-plugin-fusion", {
      "themePackage": "@alifd/theme-lowcode-light",
      "externalNext": "umd"
    }],
    ["build-plugin-moment-locales", {
      "locales": ["zh-cn"]
    }],
    "./build.plugin.js"
  ]
}
```

- **build-plugin-react-app**: React 应用构建插件
- **build-plugin-fusion**: Fusion 组件库插件，使用低代码浅色主题
- **build-plugin-moment-locales**: Moment.js 国际化插件，仅包含中文
- **./build.plugin.js**: 自定义构建插件

## 入口文件

### AliLowCodeEngine

**源文件**: [`packages/engine/src/index.ts`](../../packages/engine/src/index.ts)

**构建产物**: `AliLowCodeEngine.js`

**功能**:
- 导出引擎核心模块
- 导出类型定义
- 导出初始化和销毁函数
- 导出全局配置

### ReactSimulatorRenderer

**源文件**: [`packages/react-simulator-renderer/src/index.ts`](../../packages/react-simulator-renderer/src/index.ts)

**构建产物**: `ReactSimulatorRenderer.js`

**功能**:
- 导出 React 模拟渲染器
- 提供组件渲染能力
- 支持设计时预览

## 外部依赖

### 外部依赖说明

Ignitor 模块将常用的依赖库外部化，不在打包产物中包含这些库。使用时需要确保这些库在全局环境中可用。

### 使用方式

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>LowCodeEngine Editor</title>
</head>
<body>
  <div id="engine-container"></div>

  <!-- 引入外部依赖 -->
  <script src="https://g.alicdn.com/code/lib/react/18.2.0/umd/react.production.min.js"></script>
  <script src="https://g.alicdn.com/code/lib/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.min.js"></script>
  <script src="https://g.alicdn.com/code/lib/moment.js/2.29.4/moment.min.js"></script>
  <script src="https://g.alicdn.com/code/lib/lodash.js/4.17.21/lodash.min.js"></script>

  <!-- 引入构建产物 -->
  <script src="./AliLowCodeEngine.js"></script>
  <script src="./ReactSimulatorRenderer.js"></script>

  <script>
    // 使用引擎
    window.AliLowCodeEngine.init(document.getElementById('engine-container'), {
      designMode: 'design'
    });
  </script>
</body>
</html>
```

## 构建插件

### build.plugin.js

[`build.plugin.js`](../../packages/ignitor/build.plugin.js) 是自定义的 webpack 插件配置，提供以下功能：

#### 1. TypeScript 路径解析

```javascript
config.resolve.plugin('tsconfigpaths').use(TsconfigPathsPlugin, [
  {
    configFile: './tsconfig.json',
  },
]);
```

使用 [`tsconfig-paths-webpack-plugin`](../../packages/ignitor/build.plugin.js:1) 解析 TypeScript 路径别名。

#### 2. 版本号注入

```javascript
config.plugin('define').use(context.webpack.DefinePlugin, [{
  VERSION_PLACEHOLDER: JSON.stringify(version),
}]);
```

从 [`lerna.json`](../../lerna.json) 读取版本号，注入到构建产物中。

#### 3. 禁用热更新

```javascript
config.plugins.delete('hot');
config.devServer.hot(false);
```

禁用热模块替换功能。

#### 4. 源码映射配置

```javascript
if (context.command === 'start') {
  config.devtool('inline-source-map');
}
```

在开发模式下启用内联源码映射。

### 完整代码

```javascript
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const fse = require('fs-extra');
// read from lerna
const lernaConfig = JSON.parse(fse.readFileSync('../../lerna.json', 'utf8'));
const { version } = lernaConfig;

module.exports = ({ context, onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.resolve.plugin('tsconfigpaths').use(TsconfigPathsPlugin, [
      {
        configFile: './tsconfig.json',
      },
    ]);
    config
      .plugin('define')
      .use(context.webpack.DefinePlugin, [{
        VERSION_PLACEHOLDER: JSON.stringify(version),
      }]);
    config.plugins.delete('hot');
    config.devServer.hot(false);
    if (context.command === 'start') {
      config.devtool('inline-source-map');
    }
  });
};
```

## 使用场景

### 场景 1: 本地开发调试

启动本地开发服务器进行引擎调试：

```bash
cd packages/ignitor
npm start
```

开发服务器将在 `http://localhost:5555` 启动。

### 场景 2: 构建资源文件

构建引擎资源文件：

```bash
cd packages/ignitor
npm run build
```

构建产物将输出到 `dist/` 目录。

### 场景 3: 在浏览器中使用

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>LowCodeEngine Editor</title>
</head>
<body>
  <div id="engine-container"></div>

  <!-- 引入外部依赖 -->
  <script src="https://g.alicdn.com/code/lib/react/18.2.0/umd/react.production.min.js"></script>
  <script src="https://g.alicdn.com/code/lib/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.min.js"></script>
  <script src="https://g.alicdn.com/code/lib/moment.js/2.29.4/moment.min.js"></script>
  <script src="https://g.alicdn.com/code/lib/lodash.js/4.17.21/lodash.min.js"></script>

  <!-- 引入构建产物 -->
  <script src="./AliLowCodeEngine.js"></script>
  <script src="./ReactSimulatorRenderer.js"></script>

  <script>
    // 初始化引擎
    window.AliLowCodeEngine.init(document.getElementById('engine-container'), {
      designMode: 'design',
      device: 'desktop',
      locale: 'zh-CN'
    });
  </script>
</body>
</html>
```

### 场景 4: 使用代理进行本地调试

参考 [代理文档](https://lowcode-engine.cn/site/docs/participate/prepare) 进行本地调试配置。

## 相关文档

- [Engine 模块](../03-engine/index.md)
- [React Simulator Renderer 模块](../04-renderer-core/index.md)
- [系统架构总览](../00-overview/architecture-overview.md)
- [低代码引擎官方文档](https://lowcode-engine.cn/)
- [LowCode Demo](https://github.com/alibaba/lowcode-demo)
