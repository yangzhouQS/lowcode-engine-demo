# build.test.json 文件功能说明

## 文件路径

`packages/react-renderer/build.test.json`

## 功能概述

[`build.test.json`](packages/react-renderer/build.test.json) 是 React Renderer 模块的测试构建配置文件，定义了测试环境下的构建插件配置。该文件被 [`@alib/build-scripts`](packages/react-renderer/package.json:28) 构建工具读取，用于配置测试构建流程。

## 主要功能

1. **测试构建配置**: 定义测试环境下的构建插件
2. **低代码引擎支持**: 使用低代码引擎构建插件
3. **测试辅助工具**: 集成测试辅助工具插件

## 代码结构

```json
{
  "plugins": [
    "@alilc/build-plugin-lce",
    "@alilc/lowcode-test-mate/plugin/index.ts"
  ]
}
```

## 详细说明

### 1. plugins

```json
"plugins": [
    "@alilc/build-plugin-lce",
    "@alilc/lowcode-test-mate/plugin/index.ts"
  ]
```

**功能**: 定义测试构建过程中使用的插件列表。

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

**说明**: 该插件是专门为低代码引擎定制的构建插件，提供了低代码引擎项目所需的特定构建能力。在测试构建中，它确保代码能够正确编译和转换。

### 3. @alilc/lowcode-test-mate/plugin/index.ts

```json
"@alilc/lowcode-test-mate/plugin/index.ts"
```

**功能**: 低代码引擎测试辅助工具插件。

**主要功能**:
- 测试环境配置
- 测试工具集成
- 测试辅助函数提供

**说明**: 该插件专门用于测试环境，提供测试所需的辅助工具和配置。

## 构建流程

### 插件执行流程

```
1. @alilc/build-plugin-lce
   ├─ TypeScript 编译
   ├─ 代码转换
   └─ 资源处理

2. @alilc/lowcode-test-mate/plugin/index.ts
   ├─ 测试环境配置
   └─ 测试工具集成
```

### 构建命令

```bash
npm test
```

**功能**: 运行测试套件。

**执行流程**:
1. 使用 [`build.test.json`](packages/react-renderer/build.test.json) 配置文件
2. 执行插件构建流程
3. 运行 Jest 测试
4. 生成测试报告

## 与其他配置文件的关系

### 与 build.json 的关系

| 配置文件 | 用途 | 环境 |
|---------|------|------|
| [`build.json`](packages/react-renderer/build.json) | 开发和生产构建配置 | 开发、生产 |
| [`build.test.json`](packages/react-renderer/build.test.json) | 测试构建配置 | 测试 |

**主要区别**:
- [`build.json`](packages/react-renderer/build.json): 包含 Fusion Design 和 Moment.js 插件
- [`build.test.json`](packages/react-renderer/build.test.json): 包含测试辅助工具插件

### 与 package.json 的关系

| 配置文件 | 用途 |
|---------|------|
| [`build.test.json`](packages/react-renderer/build.test.json) | 测试构建插件配置 |
| [`package.json`](packages/react-renderer/package.json) | 测试脚本定义 |

**测试脚本**:
```json
{
  "scripts": {
    "test": "build-scripts test --config build.test.json"
  }
}
```

**说明**: 测试脚本使用 `--config build.test.json` 参数指定测试构建配置文件。

### 与 jest.config.js 的关系

| 配置文件 | 用途 |
|---------|------|
| [`build.test.json`](packages/react-renderer/build.test.json) | 测试构建配置 |
| [`jest.config.js`](packages/react-renderer/jest.config.js) | Jest 运行时配置 |

**协作方式**:
1. [`build.test.json`](packages/react-renderer/build.test.json) 配置测试构建流程
2. [`jest.config.js`](packages/react-renderer/jest.config.js) 配置测试运行时行为
3. 两者配合完成完整的测试流程

## 配置说明

### 为什么使用单独的测试配置

1. **环境隔离**: 测试环境与开发/生产环境分离
2. **插件差异**: 测试环境需要特定的测试辅助工具
3. **构建优化**: 针对测试环境优化构建流程
4. **依赖管理**: 测试环境可能需要不同的依赖

### 为什么包含测试辅助工具插件

1. **测试工具**: 提供测试所需的辅助函数和工具
2. **环境配置**: 配置测试环境特定的设置
3. **Mock 支持**: 提供 Mock 功能和工具
4. **断言库**: 集成断言库和测试工具

## 最佳实践

### 1. 测试配置

- **环境隔离**: 使用单独的测试配置文件
- **插件选择**: 只包含测试环境需要的插件
- **构建优化**: 针对测试环境优化构建流程

### 2. 测试流程

- **自动化**: 在 CI/CD 中自动运行测试
- **覆盖率**: 收集测试覆盖率
- **快速反馈**: 快速反馈测试结果

### 3. 测试辅助工具

- **工具集成**: 充分利用测试辅助工具插件
- **Mock 管理**: 合理使用 Mock 功能
- **断言清晰**: 使用清晰的断言

## 常见问题

### 1. 测试构建失败

**问题**: 测试构建过程中出现错误

**解决方案**:
- 检查插件版本是否兼容
- 查看构建日志中的错误信息
- 确认测试辅助工具插件是否正确安装

### 2. 测试运行失败

**问题**: 测试运行时出现错误

**解决方案**:
- 检查 [`jest.config.js`](packages/react-renderer/jest.config.js) 配置
- 查看测试日志中的错误信息
- 确认测试辅助工具是否正确配置

### 3. 测试覆盖率不准确

**问题**: 测试覆盖率报告不准确

**解决方案**:
- 检查 [`jest.config.js`](packages/react-renderer/jest.config.js) 中的覆盖率配置
- 确认测试是否覆盖了所有分支
- 验证测试辅助工具是否正确集成

## 相关文件

- [`package.json`](packages/react-renderer/package.json): NPM 包配置
- [`build.json`](packages/react-renderer/build.json): 开发和生产构建配置
- [`jest.config.js`](packages/react-renderer/jest.config.js): Jest 配置
- [`tests/index.test.tsx`](packages/react-renderer/tests/index.test.tsx): 测试文件

## 总结

[`build.test.json`](packages/react-renderer/build.test.json) 是 React Renderer 模块的测试构建配置中心，通过配置两个关键插件（`@alilc/build-plugin-lce`、`@alilc/lowcode-test-mate/plugin/index.ts`），实现了高效的测试构建流程。该配置确保了测试环境的正确配置、测试辅助工具的正确集成，为测试执行提供了完整的构建支持。
