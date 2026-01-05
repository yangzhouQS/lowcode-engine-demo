# build.json 文件功能说明

## 文件路径

`packages/react-renderer/build.json`

## 功能概述

[`build.json`](packages/react-renderer/build.json) 是 React Renderer 模块的构建配置文件，定义了构建过程中使用的插件和插件配置。该文件被 [`@alib/build-scripts`](packages/react-renderer/package.json:28) 构建工具读取，用于配置 TypeScript 编译、代码转换、资源处理等构建流程。

## 主要功能

1. **插件配置**: 定义构建过程中使用的插件列表
2. **Fusion Design 支持**: 配置 Fusion Design 组件库的构建插件
3. **国际化支持**: 配置 Moment.js 国际化插件，只包含中文语言包

## 代码结构

```json
{
  "plugins": [
    "@alilc/build-plugin-lce",
    "build-plugin-fusion",
    ["build-plugin-moment-locales", {
      "locales": ["zh-cn"]
    }]
  ]
}
```

## 详细说明

### 1. plugins

```json
"plugins": [
    "@alilc/build-plugin-lce",
    "build-plugin-fusion",
    ["build-plugin-moment-locales", {
      "locales": ["zh-cn"]
    }]
  ]
```

**功能**: 定义构建过程中使用的插件列表。

**插件执行顺序**: 插件按照数组中的顺序依次执行。

### 2. @alilc/build-plugin-lce

```json
"@alilc/build-plugin-lce"
```

**功能**: 阿里巴巴低代码引擎的构建插件。

**主要功能**:
- TypeScript 编译支持
- 低代码引擎特定的构建规则
- 低代码引擎的代码转换

**说明**: 该插件是专门为低代码引擎定制的构建插件，提供了低代码引擎项目所需的特定构建能力。

### 3. build-plugin-fusion

```json
"build-plugin-fusion"
```

**功能**: Fusion Design 组件库的构建插件。

**主要功能**:
- Fusion Design 组件的按需加载
- Fusion Design 样式的按需加载
- Fusion Design 主题配置
- Fusion Design 组件的代码转换

**说明**: 该插件优化了 Fusion Design 组件库的构建，支持按需加载和主题定制，减少最终打包体积。

### 4. build-plugin-moment-locales

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
- 插件名称: `build-plugin-moment-locales`
- 配置选项: `{ "locales": ["zh-cn"] }`

**详细配置**:

| 配置项 | 值 | 说明 |
|-------|-----|------|
| `locales` | `["zh-cn"]` | 只包含中文语言包 |

**设计目的**:
- 减少打包体积：只包含需要的语言包
- 提高加载速度：减少不必要的语言包加载
- 按需国际化：根据项目需求选择语言包

**支持的 locales**:
- `zh-cn`: 简体中文
- `zh-tw`: 繁体中文
- `zh-hk`: 繁体香港
- `en-us`: 英语（美国）
- `en-gb`: 英语（英国）
- 其他 Moment.js 支持的语言

## 构建流程

### 插件执行流程

```
1. @alilc/build-plugin-lce
   ├─ TypeScript 编译
   ├─ 代码转换
   └─ 资源处理

2. build-plugin-fusion
   ├─ Fusion Design 组件处理
   ├─ 按需加载配置
   └─ 主题配置

3. build-plugin-moment-locales
   └─ Moment.js 语言包过滤
```

### 构建输出

根据 [`package.json`](packages/react-renderer/package.json) 中的配置，构建工具会生成以下输出：

| 输出目录 | 格式 | 用途 |
|---------|------|------|
| `lib/` | CommonJS | Node.js 和 CommonJS 模块系统 |
| `es/` | ES Module | 现代打包工具（Webpack、Rollup 等） |
| `dist/` | UMD | 浏览器直接引用 |

## 构建命令

### 开发构建

```bash
npm run build
```

**功能**: 构建开发版本。

**输出**:
- `lib/` 目录（CommonJS）
- `es/` 目录（ES Module）

### UMD 构建

```bash
npm run build:umd
```

**功能**: 构建 UMD 版本。

**输出**:
- `dist/` 目录（UMD）
- 设置 Node.js 最大堆内存为 8GB

**内存设置说明**:
- `NODE_OPTIONS=--max_old_space_size=8192`: 设置 Node.js 最大堆内存为 8GB
- 用于处理大型项目构建时的内存不足问题

### 测试构建

```bash
npm test
```

**功能**: 运行测试套件。

**配置**: 使用 [`build.test.json`](packages/react-renderer/build.test.json) 配置文件

### 开发服务器

```bash
npm start
```

**功能**: 启动开发服务器。

**特性**:
- 热更新
- 实时预览
- 错误提示

## 插件配置详解

### @alilc/build-plugin-lce 配置

该插件通常支持以下配置（通过 [`build.json`](packages/react-renderer/build.json) 或环境变量）:

| 配置项 | 默认值 | 说明 |
|-------|--------|------|
| `typescript` | `true` | 是否启用 TypeScript 编译 |
| `babel` | `false` | 是否使用 Babel 转译 |
| `sourceMap` | `true` | 是否生成 source map |
| `minify` | `true` | 是否压缩代码 |

### build-plugin-fusion 配置

该插件通常支持以下配置:

| 配置项 | 默认值 | 说明 |
|-------|--------|------|
| `theme` | - | Fusion Design 主题 |
| `locale` | `zh-cn` | 默认语言 |
| `按需加载` | `true` | 是否启用按需加载 |

### build-plugin-moment-locales 配置

该插件支持的配置:

| 配置项 | 默认值 | 说明 |
|-------|--------|------|
| `locales` | `["zh-cn"]` | 包含的语言包列表 |
| `ignore` | `[]` | 忽略的语言包 |

## 与其他配置文件的关系

### 与 package.json 的关系

| 配置文件 | 用途 |
|---------|------|
| [`build.json`](packages/react-renderer/build.json) | 构建插件配置 |
| [`package.json`](packages/react-renderer/package.json) | 构建脚本定义 |
| [`tsconfig.json`](packages/react-renderer/tsconfig.json) | TypeScript 编译配置 |

### 与 tsconfig.json 的关系

| 配置文件 | 用途 |
|---------|------|
| [`tsconfig.json`](packages/react-renderer/tsconfig.json) | TypeScript 编译选项 |
| [`build.json`](packages/react-renderer/build.json) | 构建流程控制 |

**协作方式**:
1. [`@alilc/build-plugin-lce`](packages/react-renderer/build.json:9) 读取 [`tsconfig.json`](packages/react-renderer/tsconfig.json) 的配置
2. 执行 TypeScript 编译
3. 输出到 [`tsconfig.json`](packages/react-renderer/tsconfig.json) 中定义的 `outDir` 目录

## 最佳实践

### 1. 插件配置

- **按需加载**: 使用 `build-plugin-fusion` 启用按需加载，减少打包体积
- **语言包过滤**: 使用 `build-plugin-moment-locales` 只包含需要的语言包
- **构建优化**: 根据环境选择不同的构建配置

### 2. 内存管理

- **大型项目**: 使用 `build:umd` 命令时设置更大的内存
- **CI/CD 环境**: 在 CI/CD 环境中可能需要调整内存设置
- **本地开发**: 本地开发通常不需要调整内存

### 3. 构建性能

- **增量构建**: 利用缓存机制加速构建
- **并行处理**: 利用多核 CPU 加速编译
- **Source Map**: 开发环境生成 source map，生产环境可选择不生成

## 常见问题

### 1. 构建失败

**问题**: 构建过程中出现错误

**解决方案**:
- 检查插件版本是否兼容
- 查看构建日志中的错误信息
- 尝试清理缓存后重新构建

### 2. 内存不足

**问题**: 构建时出现内存不足错误

**解决方案**:
- 使用 `build:umd` 命令，该命令已设置 8GB 内存
- 或者手动设置: `NODE_OPTIONS=--max_old_space_size=8192 npm run build`
- 关闭其他占用内存的程序

### 3. 语言包缺失

**问题**: 构建后缺少某些语言包

**解决方案**:
- 检查 [`build.json`](packages/react-renderer/build.json) 中的 `locales` 配置
- 确认需要的语言包是否在列表中
- 添加缺失的语言包

## 相关文件

- [`package.json`](packages/react-renderer/package.json): NPM 包配置
- [`tsconfig.json`](packages/react-renderer/tsconfig.json): TypeScript 配置
- [`build.test.json`](packages/react-renderer/build.test.json): 测试构建配置
- [`build.umd.json`](packages/react-renderer/build.umd.json): UMD 构建配置

## 总结

[`build.json`](packages/react-renderer/build.json) 是 React Renderer 模块的构建配置中心，通过配置三个关键插件（`@alilc/build-plugin-lce`、`build-plugin-fusion`、`build-plugin-moment-locales`），实现了高效的构建流程。该配置确保了 TypeScript 编译、Fusion Design 组件处理和国际化支持的正确集成，为开发、测试和生产构建提供了完整的构建能力。
