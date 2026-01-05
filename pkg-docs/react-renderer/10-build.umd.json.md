# build.umd.json 文件功能说明

## 文件路径

`packages/react-renderer/build.umd.json`

## 功能概述

[`build.umd.json`](packages/react-renderer/build.umd.json) 是 React Renderer 模块的 UMD (Universal Module Definition) 构建配置文件，定义了将模块打包为 UMD 格式的配置。UMD 格式可以在 CommonJS、AMD 和全局变量三种模块系统中使用，适用于浏览器环境直接引用。

## 主要功能

1. **UMD 打包**: 将模块打包为 UMD 格式
2. **外部依赖**: 配置外部依赖，不打包到最终文件中
3. **库配置**: 设置库名称和导出格式
4. **Fusion Design 支持**: 配置 Fusion Design 组件库的 UMD 构建
5. **国际化支持**: 配置 Moment.js 国际化插件

## 代码结构

```json
{
  "entry": {
    "react-renderer": "src/index"
  },
  "sourceMap": true,
  "library": "AliLowCodeReactRenderer",
  "libraryTarget": "umd",
  "externals": {
    "react": "var window.React",
    "react-dom": "var window.ReactDOM",
    "prop-types": "var window.PropTypes",
    "@alifd/next": "var Next",
    "moment": "var window.moment"
  },
  "polyfill": false,
  "outputDir": "dist",
  "vendor": false,
  "ignoreHtmlTemplate": true,
  "plugins": [
    "build-plugin-react-app",
    ["build-plugin-fusion", {
      "externalNext": "umd"
    }],
    ["build-plugin-moment-locales", {
      "locales": ["zh-cn"]
    }]
  ]
}
```

## 详细说明

### 1. entry

```json
"entry": {
  "react-renderer": "src/index"
}
```

**功能**: 定义打包入口文件。

**配置说明**:

| 配置项 | 值 | 说明 |
|-------|-----|------|
| `react-renderer` | `"src/index"` | 入口文件路径 |

**说明**:
- 键 `react-renderer` 是输出文件名
- 值 `src/index` 是源文件路径
- 最终输出文件为 `dist/react-renderer.js`

### 2. sourceMap

```json
"sourceMap": true
```

**功能**: 启用 source map 生成。

**说明**:
- 生成 `.map` 文件
- 便于调试打包后的代码
- 在生产环境中可以选择关闭以减小文件体积

### 3. library

```json
"library": "AliLowCodeReactRenderer"
```

**功能**: 设置 UMD 库的名称。

**说明**:
- 在浏览器中通过全局变量 `AliLowCodeReactRenderer` 访问
- 例如: `const renderer = new AliLowCodeReactRenderer(...)`

### 4. libraryTarget

```json
"libraryTarget": "umd"
```

**功能**: 设置库的导出格式。

**支持的格式**:

| 格式 | 说明 |
|------|------|
| `umd` | Universal Module Definition，支持 CommonJS、AMD 和全局变量 |
| `commonjs2` | CommonJS 2 格式 |
| `amd` | AMD 格式 |
| `var` | 全局变量格式 |
| `this` | this 格式 |
| `window` | window 对象属性格式 |

**说明**: UMD 格式是最通用的格式，可以在多种模块系统中使用。

### 5. externals

```json
"externals": {
  "react": "var window.React",
  "react-dom": "var window.ReactDOM",
  "prop-types": "var window.PropTypes",
  "@alifd/next": "var Next",
  "moment": "var window.moment"
}
```

**功能**: 配置外部依赖，不打包到最终文件中。

**配置说明**:

| 包名 | 全局变量 | 说明 |
|------|---------|------|
| `react` | `var window.React` | React 核心库 |
| `react-dom` | `var window.ReactDOM` | React DOM 库 |
| `prop-types` | `var window.PropTypes` | PropTypes 类型检查库 |
| `@alifd/next` | `var Next` | Fusion Design 组件库 |
| `moment` | `var window.moment` | Moment.js 时间库 |

**设计目的**:
- 减少打包体积：不打包大型依赖库
- 避免重复打包：多个库可以共享同一个依赖
- 灵活升级：用户可以自行升级依赖版本

**使用方式**:
```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@alifd/next/dist/next.min.js"></script>
<script src="https://unpkg.com/moment/min/moment.min.js"></script>
<script src="./react-renderer.js"></script>
```

### 6. polyfill

```json
"polyfill": false
```

**功能**: 禁用 polyfill。

**说明**:
- 不自动添加浏览器兼容性 polyfill
- 用户需要自行处理浏览器兼容性
- 减少打包体积

### 7. outputDir

```json
"outputDir": "dist"
```

**功能**: 设置输出目录。

**说明**:
- 打包后的文件输出到 `dist/` 目录
- 与 [`package.json`](packages/react-renderer/package.json:8) 中的 `"unpkg"` 字段对应

### 8. vendor

```json
"vendor": false
```

**功能**: 禁用 vendor 打包。

**说明**:
- 不单独打包 vendor 文件
- 所有代码打包到一个文件中

### 9. ignoreHtmlTemplate

```json
"ignoreHtmlTemplate": true
```

**功能**: 忽略 HTML 模板。

**说明**:
- 不生成 HTML 模板文件
- 只生成 JavaScript 文件

### 10. plugins

```json
"plugins": [
  "build-plugin-react-app",
  ["build-plugin-fusion", {
    "externalNext": "umd"
  }],
  ["build-plugin-moment-locales", {
    "locales": ["zh-cn"]
  }]
]
```

**功能**: 定义构建过程中使用的插件列表。

#### 10.1 build-plugin-react-app

```json
"build-plugin-react-app"
```

**功能**: React 应用构建插件。

**主要功能**:
- React 应用构建
- Webpack 配置
- 开发服务器支持

#### 10.2 build-plugin-fusion

```json
[
  "build-plugin-fusion",
  {
    "externalNext": "umd"
  }
]
```

**功能**: Fusion Design 组件库构建插件。

**配置说明**:

| 配置项 | 值 | 说明 |
|-------|-----|------|
| `externalNext` | `"umd"` | Fusion Design 使用 UMD 格式 |

**说明**: 配置 Fusion Design 组件库使用 UMD 格式，与外部依赖配置一致。

#### 10.3 build-plugin-moment-locales

```json
[
  "build-plugin-moment-locales",
  {
    "locales": ["zh-cn"]
  }
]
```

**功能**: Moment.js 国际化插件配置。

**配置说明**:

| 配置项 | 值 | 说明 |
|-------|-----|------|
| `locales` | `["zh-cn"]` | 只包含中文语言包 |

## 构建流程

### 插件执行流程

```
1. build-plugin-react-app
   ├─ React 应用构建
   ├─ Webpack 配置
   └─ 开发服务器支持

2. build-plugin-fusion
   ├─ Fusion Design 组件处理
   ├─ UMD 格式配置
   └─ 按需加载配置

3. build-plugin-moment-locales
   └─ Moment.js 语言包过滤
```

### 构建输出

```
dist/
├── react-renderer.js       # UMD 格式的主文件
├── react-renderer.js.map   # Source map 文件
└── ... (其他可能的输出)
```

### 构建命令

```bash
npm run build:umd
```

**功能**: 构建 UMD 版本。

**完整命令**:
```bash
NODE_OPTIONS=--max_old_space_size=8192 build-scripts build --config build.umd.json
```

**说明**:
- 设置 Node.js 最大堆内存为 8GB
- 使用 [`build.umd.json`](packages/react-renderer/build.umd.json) 配置文件
- 输出到 `dist/` 目录

## 使用方式

### 1. HTML 直接引用

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>React Renderer Demo</title>
  <!-- 引入依赖 -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@alifd/next/dist/next.min.js"></script>
  <script src="https://unpkg.com/moment/min/moment.min.js"></script>
  <!-- 引入 React Renderer -->
  <script src="./dist/react-renderer.js"></script>
</head>
<body>
  <div id="root"></div>
  <script>
    // 使用 AliLowCodeReactRenderer
    const { ReactRenderer } = AliLowCodeReactRenderer;
    const renderer = new ReactRenderer({
      schema: { /* schema */ },
      components: { /* components */ }
    });
    renderer.render(document.getElementById('root'));
  </script>
</body>
</html>
```

### 2. CDN 引用

```html
<script src="https://unpkg.com/@alilc/lowcode-react-renderer/dist/react-renderer.js"></script>
```

### 3. 模块系统使用

#### CommonJS

```javascript
const { ReactRenderer } = require('@alilc/lowcode-react-renderer');
```

#### AMD

```javascript
define(['@alilc/lowcode-react-renderer'], function(ReactRenderer) {
  // 使用 ReactRenderer
});
```

#### ES Module

```javascript
import { ReactRenderer } from '@alilc/lowcode-react-renderer';
```

## 与其他配置文件的关系

### 与 package.json 的关系

| 配置文件 | 用途 |
|---------|------|
| [`build.umd.json`](packages/react-renderer/build.umd.json) | UMD 构建配置 |
| [`package.json`](packages/react-renderer/package.json) | NPM 包配置 |

**对应字段**:
```json
{
  "unpkg": "dist/react-renderer.js",
  "jsdelivr": "dist/react-renderer.js"
}
```

### 与 build.json 的关系

| 配置文件 | 用途 | 输出格式 | 输出目录 |
|---------|------|---------|---------|
| [`build.json`](packages/react-renderer/build.json) | 开发和生产构建 | CommonJS、ES Module | `lib/`、`es/` |
| [`build.umd.json`](packages/react-renderer/build.umd.json) | UMD 构建 | UMD | `dist/` |

**主要区别**:
- [`build.json`](packages/react-renderer/build.json): 用于 NPM 包发布，支持多种模块格式
- [`build.umd.json`](packages/react-renderer/build.umd.json): 用于浏览器直接引用，只支持 UMD 格式

## 配置说明

### 为什么使用 UMD 格式

1. **通用性**: 支持多种模块系统（CommonJS、AMD、全局变量）
2. **浏览器兼容**: 可以在浏览器中直接引用
3. **CDN 支持**: 适合通过 CDN 分发
4. **简单易用**: 无需构建工具即可使用

### 为什么使用外部依赖

1. **减少体积**: 不打包大型依赖库
2. **避免重复**: 多个库可以共享同一个依赖
3. **灵活升级**: 用户可以自行升级依赖版本
4. **缓存优化**: 依赖库可以被浏览器缓存

### 为什么设置 8GB 内存

1. **大型项目**: 处理大型项目时需要更多内存
2. **Webpack 限制**: Webpack 打包大型项目时内存消耗较大
3. **构建稳定性**: 避免内存不足导致构建失败

## 最佳实践

### 1. UMD 构建

- **外部依赖**: 合理配置外部依赖，减少打包体积
- **Source Map**: 开发环境启用，生产环境可选择关闭
- **压缩代码**: 生产环境使用压缩版本

### 2. 使用方式

- **CDN 引用**: 使用 CDN 加速加载
- **版本管理**: 明确指定版本号
- **缓存策略**: 合理设置缓存策略

### 3. 依赖管理

- **版本兼容**: 确保依赖版本兼容
- **按需加载**: 只加载需要的依赖
- **升级策略**: 制定依赖升级策略

## 常见问题

### 1. 构建失败

**问题**: UMD 构建过程中出现错误

**解决方案**:
- 检查插件版本是否兼容
- 查看构建日志中的错误信息
- 尝试清理缓存后重新构建
- 确认内存设置是否足够

### 2. 运行时错误

**问题**: 浏览器中运行时出现错误

**解决方案**:
- 检查外部依赖是否正确加载
- 确认依赖版本是否兼容
- 查看浏览器控制台错误信息
- 验证全局变量是否正确设置

### 3. 内存不足

**问题**: 构建时出现内存不足错误

**解决方案**:
- 使用 `build:umd` 命令，该命令已设置 8GB 内存
- 或者手动设置: `NODE_OPTIONS=--max_old_space_size=8192 npm run build:umd`
- 关闭其他占用内存的程序
- 减少并行构建任务

## 相关文件

- [`package.json`](packages/react-renderer/package.json): NPM 包配置
- [`build.json`](packages/react-renderer/build.json): 开发和生产构建配置
- [`src/index.ts`](packages/react-renderer/src/index.ts): 主入口文件

## 总结

[`build.umd.json`](packages/react-renderer/build.umd.json) 是 React Renderer 模块的 UMD 构建配置中心，通过配置入口文件、外部依赖、库设置和插件，实现了高效的 UMD 打包流程。该配置确保了模块可以在浏览器中直接使用，支持多种模块系统，为 CDN 分发和简单使用场景提供了完整的构建支持。
