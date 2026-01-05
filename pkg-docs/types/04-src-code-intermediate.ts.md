# src/code-intermediate.ts - 代码中间表示类型定义

## 文件路径
`packages/types/src/code-intermediate.ts`

## 文件概述
定义了代码中间表示的类型，主要用于描述 package.json 文件的结构。这个类型在代码生成过程中使用，用于生成项目的 package.json 文件。

## 功能说明

### 主要职责
1. **Package.json 结构定义**: 定义 package.json 文件的完整结构
2. **代码生成支持**: 为代码生成器提供类型支持
3. **项目配置**: 描述项目的依赖、脚本、引擎等配置信息

## 类型定义详解

### PackageJSON
package.json 文件的完整接口定义。

```typescript
export interface PackageJSON {
  name: string;                          // 项目名称
  version: string;                       // 项目版本
  description?: string;                  // 项目描述
  dependencies: Record<string, string>;  // 生产依赖
  devDependencies: Record<string, string>; // 开发依赖
  scripts?: Record<string, string>;      // 脚本命令
  engines?: Record<string, string>;      // 引擎要求
  repository?: {                         // 仓库信息
    type: string;                        // 仓库类型（如 git）
    url: string;                         // 仓库 URL
  };
  private?: boolean;                     // 是否为私有包
}
```

**字段详细说明**:

#### 1. name
- **类型**: `string`
- **必填**: 是
- **说明**: 项目的名称
- **示例**: `"my-lowcode-app"`
- **使用场景**:
  - 定义项目的唯一标识
  - 在 npm 发布时作为包名
  - 在项目中引用自身

#### 2. version
- **类型**: `string`
- **必填**: 是
- **说明**: 项目的版本号
- **示例**: `"1.0.0"`
- **使用场景**:
  - 遵循语义化版本规范（SemVer）
  - 版本管理
  - 依赖版本控制

#### 3. description
- **类型**: `string`
- **必填**: 否
- **说明**: 项目的描述信息
- **示例**: `"A lowcode application built with Ali lowcode engine"`
- **使用场景**:
  - 在 npm 中显示项目描述
  - 文档说明
  - 项目介绍

#### 4. dependencies
- **类型**: `Record<string, string>`
- **必填**: 是
- **说明**: 生产环境的依赖包
- **示例**:
  ```typescript
  {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@alilc/lowcode-engine": "^1.3.0"
  }
  ```
- **使用场景**:
  - 定义项目运行时需要的依赖
  - 指定依赖版本范围
  - 生产环境安装

#### 5. devDependencies
- **类型**: `Record<string, string>`
- **必填**: 是
- **说明**: 开发环境的依赖包
- **示例**:
  ```typescript
  {
    "typescript": "^5.0.0",
    "webpack": "^5.0.0",
    "@types/react": "^18.0.0"
  }
  ```
- **使用场景**:
  - 定义开发工具和构建工具
  - 类型定义文件
  - 测试工具

#### 6. scripts
- **类型**: `Record<string, string>`
- **必填**: 否
- **说明**: npm 脚本命令
- **示例**:
  ```typescript
  {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production",
    "test": "jest"
  }
  ```
- **使用场景**:
  - 定义常用命令
  - 构建和开发脚本
  - 测试脚本

#### 7. engines
- **类型**: `Record<string, string>`
- **必填**: 否
- **说明**: 项目要求的引擎版本
- **示例**:
  ```typescript
  {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  }
  ```
- **使用场景**:
  - 指定 Node.js 版本要求
  - 指定 npm 版本要求
  - 环境兼容性控制

#### 8. repository
- **类型**: `{ type: string; url: string }`
- **必填**: 否
- **说明**: 项目的仓库信息
- **示例**:
  ```typescript
  {
    "type": "git",
    "url": "https://github.com/username/my-lowcode-app.git"
  }
  ```
- **使用场景**:
  - 指定代码仓库
  - 在 npm 中显示仓库链接
  - 项目协作

#### 9. private
- **类型**: `boolean`
- **必填**: 否
- **说明**: 是否为私有包
- **示例**: `true`
- **使用场景**:
  - 防止意外发布到 npm
  - 内部项目标记
  - 企业内部项目

## 使用示例

### 基本项目配置
```typescript
import { PackageJSON } from '@alilc/lowcode-types';

const packageJson: PackageJSON = {
  name: 'my-lowcode-app',
  version: '1.0.0',
  description: 'A lowcode application',
  dependencies: {
    'react': '^18.0.0',
    'react-dom': '^18.0.0',
    '@alilc/lowcode-engine': '^1.3.0'
  },
  devDependencies: {
    'typescript': '^5.0.0',
    'webpack': '^5.0.0'
  }
};
```

### 完整项目配置
```typescript
const packageJson: PackageJSON = {
  name: 'my-lowcode-app',
  version: '1.0.0',
  description: 'A lowcode application built with Ali lowcode engine',
  dependencies: {
    'react': '^18.0.0',
    'react-dom': '^18.0.0',
    '@alilc/lowcode-engine': '^1.3.0',
    '@alifd/theme-design-pro': '^0.8.0'
  },
  devDependencies: {
    'typescript': '^5.0.0',
    'webpack': '^5.0.0',
    'webpack-cli': '^5.0.0',
    '@types/react': '^18.0.0',
    '@types/react-dom': '^18.0.0'
  },
  scripts: {
    'start': 'webpack serve --mode development',
    'build': 'webpack --mode production',
    'test': 'jest',
    'lint': 'eslint src --ext .ts,.tsx'
  },
  engines: {
    'node': '>=16.0.0',
    'npm': '>=8.0.0'
  },
  repository: {
    'type': 'git',
    'url': 'https://github.com/username/my-lowcode-app.git'
  },
  private: true
};
```

### 代码生成使用
```typescript
// 在代码生成器中使用
function generatePackageJSON(projectName: string, dependencies: Record<string, string>): PackageJSON {
  return {
    name: projectName,
    version: '1.0.0',
    description: `Lowcode application: ${projectName}`,
    dependencies,
    devDependencies: {
      'typescript': '^5.0.0',
      'webpack': '^5.0.0'
    },
    scripts: {
      'start': 'webpack serve --mode development',
      'build': 'webpack --mode production'
    },
    private: true
  };
}
```

## 设计特点

### 1. 标准化
- 遵循 npm package.json 规范
- 与标准 npm 包结构一致
- 便于理解和维护

### 2. 类型安全
- 完整的 TypeScript 类型定义
- 严格的类型检查
- 防止配置错误

### 3. 灵活性
- 大部分字段为可选
- 支持自定义配置
- 适应不同项目需求

### 4. 代码生成支持
- 为代码生成器提供类型支持
- 自动生成 package.json
- 减少手动配置

## 注意事项

1. **版本规范**: version 字段应遵循语义化版本规范（SemVer）
2. **依赖版本**: 依赖版本应使用正确的版本范围语法（如 `^1.0.0`、`~1.0.0`）
3. **私有包**: 对于内部项目，建议设置 `private: true` 防止意外发布
4. **引擎要求**: 对于有特定环境要求的项目，应设置 engines 字段
5. **脚本命令**: scripts 字段中的命令应该确保在项目环境中可以执行

## 相关文件

- [`index.ts`](./01-src-index.ts) - 模块入口
- [`code-result.ts`](./05-src-code-result.ts) - 代码结果类型
- [`shell/type/npm-info.ts`](./shell/type/npm-info.ts) - NPM 信息类型

## 版本历史

- **v1.3.2**: 当前版本，包含 package.json 类型定义

## 使用建议

1. **版本管理**: 使用语义化版本规范，便于版本管理
2. **依赖管理**: 合理区分生产依赖和开发依赖
3. **脚本配置**: 提供常用的开发、构建、测试脚本
4. **环境要求**: 明确指定 Node.js 和 npm 的版本要求
5. **私有保护**: 对于内部项目，设置 `private: true` 防止意外发布

## 扩展字段

除了定义的字段外，package.json 还支持许多其他字段，如：
- `author`: 作者信息
- `license`: 许可证
- `keywords`: 关键词
- `homepage`: 项目主页
- `bugs`: 问题跟踪
- `main`: 入口文件
- `types`: 类型定义文件
- `files`: 发布文件
- `bin`: 可执行文件

这些字段可以根据项目需要添加到 `PackageJSON` 接口中。
