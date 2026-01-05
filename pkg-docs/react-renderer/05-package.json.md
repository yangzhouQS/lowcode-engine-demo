# package.json 文件功能说明

## 文件路径

`packages/react-renderer/package.json`

## 功能概述

[`package.json`](packages/react-renderer/package.json) 是 React Renderer 模块的 NPM 包配置文件，定义了包的元数据、依赖关系、构建脚本和发布配置。

## 主要功能

1. **包元数据**: 定义包名、版本、描述等基本信息
2. **入口文件**: 指定 CommonJS 和 ES Module 的入口文件
3. **文件发布**: 定义发布的文件和目录
4. **依赖管理**: 管理生产依赖和开发依赖
5. **构建脚本**: 定义构建、测试、开发等脚本命令
6. **发布配置**: 配置 NPM 发布相关设置

## 代码结构

```json
{
  "name": "@alilc/lowcode-react-renderer",
  "version": "1.3.2",
  "description": "react renderer for ali lowcode engine",
  "main": "lib/index.js",
  "module": "es/index.js",
  "files": [
    "lib",
    "es",
    "dist"
  ],
  "scripts": {
    "test": "build-scripts test --config build.test.json",
    "start": "build-scripts start",
    "build": "build-scripts build",
    "build:umd": "NODE_OPTIONS=--max_old_space_size=8192 build-scripts build --config build.umd.json"
  },
  "keywords": [
    "lowcode",
    "engine",
    "react"
  ],
  "dependencies": {
    "@alifd/next": "^1.21.16",
    "@alilc/lowcode-renderer-core": "1.3.2"
  },
  "devDependencies": {
    "@alib/build-scripts": "^0.1.18",
    "@alifd/next": "^1.19.17",
    "build-plugin-fusion": "^0.1.0",
    "build-plugin-moment-locales": "^0.1.0",
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-test-renderer": "^16"
  },
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "http",
    "url": "https://github.com/alibaba/lowcode-engine/tree/main/packages/react-renderer"
  },
  "homepage": "https://github.com/alibaba/lowcode-engine/#readme",
  "gitHead": "2669f179e6f899d395ce1942d0fe04f9c5ed48a6",
  "bugs": "https://github.com/alibaba/lowcode-engine/issues"
}
```

## 详细说明

### 1. 包元数据

#### name

```json
"name": "@alilc/lowcode-react-renderer"
```

**功能**: 包的唯一标识符，使用 NPM 作用域 `@alilc`。

#### version

```json
"version": "1.3.2"
```

**功能**: 包的版本号，遵循语义化版本规范（Semantic Versioning）。

#### description

```json
"description": "react renderer for ali lowcode engine"
```

**功能**: 包的简短描述，说明包的主要用途。

#### keywords

```json
"keywords": [
  "lowcode",
  "engine",
  "react"
]
```

**功能**: 包的关键词，用于 NPM 搜索和分类。

### 2. 入口文件

#### main

```json
"main": "lib/index.js"
```

**功能**: 指定 CommonJS 格式的入口文件路径。

**说明**: 
- 路径相对于包根目录
- 用于 Node.js 环境或 CommonJS 模块系统

#### module

```json
"module": "es/index.js"
```

**功能**: 指定 ES Module 格式的入口文件路径。

**说明**:
- 路径相对于包根目录
- 用于支持 ES Module 的打包工具（如 Webpack、Rollup）
- 现代 JavaScript 项目推荐使用

### 3. 文件发布

```json
"files": [
  "lib",
  "es",
  "dist"
]
```

**功能**: 定义发布到 NPM 时包含的文件和目录。

**说明**:
- `lib`: CommonJS 编译输出目录
- `es`: ES Module 编译输出目录
- `dist`: UMD 构建输出目录
- 其他文件不会被发布到 NPM

### 4. 依赖管理

#### dependencies

```json
"dependencies": {
  "@alifd/next": "^1.21.16",
  "@alilc/lowcode-renderer-core": "1.3.2"
}
```

**功能**: 定义包运行时所需的生产依赖。

**依赖说明**:

| 依赖包 | 版本 | 用途 |
|-------|------|------|
| [`@alifd/next`](packages/react-renderer/package.json:24) | ^1.21.16 | Fusion Design 组件库，提供基础 UI 组件 |
| [`@alilc/lowcode-renderer-core`](packages/react-renderer/package.json:25) | 1.3.2 | 渲染核心库，提供基础渲染能力 |

**版本说明**:
- `^1.21.16`: 兼容 1.21.16 及以上版本，但不包括 2.0.0
- `1.3.2`: 精确匹配 1.3.2 版本

#### devDependencies

```json
"devDependencies": {
  "@alib/build-scripts": "^0.1.18",
  "@alifd/next": "^1.19.17",
  "build-plugin-fusion": "^0.1.0",
  "build-plugin-moment-locales": "^0.1.0",
  "react": "^16.4.1",
  "react-dom": "^16.4.1",
  "react-test-renderer": "^16"
}
```

**功能**: 定义包开发和测试时所需的依赖。

**依赖说明**:

| 依赖包 | 版本 | 用途 |
|-------|------|------|
| [`@alib/build-scripts`](packages/react-renderer/package.json:28) | ^0.1.18 | 阿里巴巴的构建工具 |
| [`@alifd/next`](packages/react-renderer/package.json:29) | ^1.19.17 | Fusion Design 组件库（开发版本） |
| [`build-plugin-fusion`](packages/react-renderer/package.json:30) | ^0.1.0 | Fusion Design 构建插件 |
| [`build-plugin-moment-locales`](packages/react-renderer/package.json:31) | ^0.1.0 | Moment.js 国际化插件 |
| [`react`](packages/react-renderer/package.json:32) | ^16.4.1 | React 核心库 |
| [`react-dom`](packages/react-renderer/package.json:33) | ^16.4.1 | React DOM 库 |
| [`react-test-renderer`](packages/react-renderer/package.json:34) | ^16 | React 测试渲染器 |

### 5. 构建脚本

```json
"scripts": {
  "test": "build-scripts test --config build.test.json",
  "start": "build-scripts start",
  "build": "build-scripts build",
  "build:umd": "NODE_OPTIONS=--max_old_space_size=8192 build-scripts build --config build.umd.json"
}
```

**功能**: 定义可执行的脚本命令。

#### test

```json
"test": "build-scripts test --config build.test.json"
```

**功能**: 运行测试套件。

**说明**:
- 使用 [`build-scripts`](packages/react-renderer/package.json:28) 工具
- 使用 [`build.test.json`](packages/react-renderer/build.test.json) 配置文件
- 执行单元测试和集成测试

#### start

```json
"start": "build-scripts start"
```

**功能**: 启动开发服务器。

**说明**:
- 使用 [`build-scripts`](packages/react-renderer/package.json:28) 工具
- 启动热更新开发环境
- 用于开发阶段的实时预览

#### build

```json
"build": "build-scripts build"
```

**功能**: 构建生产版本。

**说明**:
- 使用 [`build-scripts`](packages/react-renderer/package.json:28) 工具
- 使用 [`build.json`](packages/react-renderer/build.json) 配置文件
- 生成 CommonJS 和 ES Module 输出

#### build:umd

```json
"build:umd": "NODE_OPTIONS=--max_old_space_size=8192 build-scripts build --config build.umd.json"
```

**功能**: 构建 UMD 格式的生产版本。

**说明**:
- 设置 Node.js 最大堆内存为 8GB
- 使用 [`build.umd.json`](packages/react-renderer/build.umd.json) 配置文件
- 生成 UMD 格式，支持浏览器直接引用

### 6. 发布配置

#### publishConfig

```json
"publishConfig": {
  "access": "public",
  "registry": "https://registry.npmjs.org/"
}
```

**功能**: 配置 NPM 发布相关设置。

**说明**:
- `access: "public"`: 公开访问，任何人都可以安装
- `registry`: 指定 NPM 注册表地址

#### repository

```json
"repository": {
  "type": "http",
  "url": "https://github.com/alibaba/lowcode-engine/tree/main/packages/react-renderer"
}
```

**功能**: 指定代码仓库地址。

**说明**:
- `type`: 仓库类型（http、git 等）
- `url`: 仓库 URL

#### homepage

```json
"homepage": "https://github.com/alibaba/lowcode-engine/#readme"
```

**功能**: 指定项目主页 URL。

#### bugs

```json
"bugs": "https://github.com/alibaba/lowcode-engine/issues"
```

**功能**: 指定问题反馈地址。

#### gitHead

```json
"gitHead": "2669f179e6f899d395ce1942d0fe04f9c5ed48a6"
```

**功能**: 记录最后一次提交的 Git commit hash。

## 构建流程

### 开发流程

1. 运行 `npm start` 启动开发服务器
2. 修改源代码
3. 实时预览变化

### 测试流程

1. 运行 `npm test` 执行测试
2. 查看测试结果
3. 修复问题并重新测试

### 构建流程

1. 运行 `npm build` 构建生产版本
2. 生成 `lib/` 目录（CommonJS）
3. 生成 `es/` 目录（ES Module）
4. 运行 `npm run build:umd` 构建 UMD 版本
5. 生成 `dist/` 目录（UMD）

### 发布流程

1. 更新版本号
2. 运行 `npm build` 构建所有版本
3. 运行 `npm publish` 发布到 NPM
4. 验证发布结果

## 注意事项

1. **版本管理**: 更新版本号时遵循语义化版本规范
2. **依赖版本**: 生产依赖和开发依赖的版本要兼容
3. **构建配置**: 确保构建配置文件正确配置
4. **文件发布**: 只发布必要的文件，减少包体积
5. **测试覆盖**: 确保测试覆盖率足够高
6. **内存设置**: UMD 构建时需要更大的内存设置

## 相关文件

- [`src/index.ts`](packages/react-renderer/src/index.ts): 主入口文件
- [`tsconfig.json`](packages/react-renderer/tsconfig.json): TypeScript 配置文件
- [`build.json`](packages/react-renderer/build.json): 构建配置文件
- [`build.test.json`](packages/react-renderer/build.test.json): 测试构建配置
- [`build.umd.json`](packages/react-renderer/build.umd.json): UMD 构建配置

## 总结

[`package.json`](packages/react-renderer/package.json) 是 React Renderer 模块的配置中心，定义了包的所有元数据、依赖关系和构建流程。通过合理的配置，确保包的开发、测试、构建和发布流程都能顺利进行。
