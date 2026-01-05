# jest.config.js 文件功能说明

## 文件路径

`packages/react-renderer/jest.config.js`

## 功能概述

[`jest.config.js`](packages/react-renderer/jest.config.js) 是 React Renderer 模块的 Jest 测试框架配置文件，定义了测试运行时的行为、模块解析规则、代码覆盖率收集等配置。

## 主要功能

1. **模块名称映射**: 将本地包的导入路径映射到源代码目录
2. **转换忽略模式**: 配置哪些模块需要被转换
3. **代码覆盖率收集**: 自动收集源代码的测试覆盖率
4. **文件扩展名支持**: 支持多种文件类型的测试

## 代码结构

```javascript
const fs = require('fs');
const { join } = require('path');
const esModules = [].join('|');
const pkgNames = fs.readdirSync(join('..')).filter(pkgName => !pkgName.startsWith('.'));

const jestConfig = {
  transformIgnorePatterns: [
    `/node_modules/(?!${esModules})/`,
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!**/node_modules/**',
  ],
};

jestConfig.moduleNameMapper = {};
jestConfig.moduleNameMapper[`^@alilc/lowcode\\-(${pkgNames.join('|')})$`] = '<rootDir>/../$1/src';

module.exports = jestConfig;
```

## 详细说明

### 1. 导入依赖

```javascript
const fs = require('fs');
const { join } = require('path');
```

**功能**: 导入 Node.js 内置模块。

**说明**:
- `fs`: 文件系统模块，用于读取目录和文件
- `join`: 路径拼接工具，用于构建跨平台的路径

### 2. ES 模块配置

```javascript
const esModules = [].join('|');
```

**功能**: 定义需要转换的 ES 模块列表。

**说明**:
- 当前为空数组，表示没有特殊的 ES 模块需要处理
- 如果某些 `node_modules` 中的包需要被转换，可以在这里添加
- 例如: `['some-es-package'].join('|')` 生成 `some-es-package`

### 3. 读取包名称

```javascript
const pkgNames = fs.readdirSync(join('..')).filter(pkgName => !pkgName.startsWith('.'));
```

**功能**: 读取父目录中的所有包名称。

**详细分析**:

| 步骤 | 操作 | 说明 |
|------|------|------|
| 1 | `join('..')` | 获取父目录路径 |
| 2 | `fs.readdirSync()` | 同步读取父目录内容 |
| 3 | `.filter()` | 过滤掉以 `.` 开头的目录 |

**示例结果**:
```
['react-renderer', 'renderer-core', 'types', 'utils', ...]
```

**用途**:
- 用于构建模块名称映射规则
- 支持本地包的导入路径解析
- 避免在测试时发布本地包

### 4. transformIgnorePatterns

```javascript
transformIgnorePatterns: [
  `/node_modules/(?!${esModules})/`,
],
```

**功能**: 定义哪些模块不需要被转换。

**配置说明**:

| 配置项 | 值 | 说明 |
|-------|-----|------|
| `transformIgnorePatterns` | 数组 | 忽略转换的模块模式列表 |

**正则表达式解析**:
```javascript
/node_modules/(?!${esModules})/
```

- `/node_modules/`: 匹配 node_modules 目录
- `(?!...)`: 负向先行断言，排除匹配的模块
- `${esModules}`: 动态插入需要转换的 ES 模块列表

**当前行为**:
- `esModules` 为空，所以所有 `node_modules` 中的模块都不会被转换
- 这意味着测试会直接使用编译后的代码

### 5. moduleFileExtensions

```javascript
moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
```

**功能**: 定义 Jest 可以解析的文件扩展名。

**支持的扩展名**:

| 扩展名 | 用途 |
|-------|------|
| `.ts` | TypeScript 源文件 |
| `.tsx` | TypeScript JSX 文件 |
| `.js` | JavaScript 文件 |
| `.json` | JSON 配置文件 |

**说明**:
- 按优先级顺序排列
- 导入文件时，Jest 会按照这个顺序查找文件
- 例如: `import { foo } from './bar'` 会依次查找 `bar.ts`、`bar.tsx`、`bar.js`、`bar.json`

### 6. collectCoverage

```javascript
collectCoverage: true,
```

**功能**: 启用代码覆盖率收集。

**说明**:
- 运行测试时自动收集代码覆盖率
- 生成覆盖率报告
- 可以在 CI/CD 流程中使用

### 7. collectCoverageFrom

```javascript
collectCoverageFrom: [
  'src/**/*.ts',
  '!src/**/*.d.ts',
  '!**/node_modules/**',
],
```

**功能**: 定义收集代码覆盖率的文件范围。

**配置说明**:

| 模式 | 说明 |
|------|------|
| `'src/**/*.ts'` | 收集 `src/` 目录下所有 TypeScript 文件的覆盖率 |
| `'!src/**/*.d.ts'` | 排除类型声明文件（`.d.ts`） |
| `'!**/node_modules/**'` | 排除 `node_modules` 目录 |

**glob 模式说明**:
- `**`: 匹配任意层级的目录
- `*.ts`: 匹配所有 `.ts` 文件
- `!`: 排除模式

### 8. moduleNameMapper

```javascript
jestConfig.moduleNameMapper = {};
jestConfig.moduleNameMapper[`^@alilc/lowcode\\-(${pkgNames.join('|')})$`] = '<rootDir>/../$1/src';
```

**功能**: 将模块导入路径映射到实际文件路径。

**详细分析**:

**步骤 1**: 初始化模块名称映射器
```javascript
jestConfig.moduleNameMapper = {};
```

**步骤 2**: 添加映射规则
```javascript
jestConfig.moduleNameMapper[`^@alilc/lowcode\\-(${pkgNames.join('|')})$`] = '<rootDir>/../$1/src';
```

**正则表达式解析**:
```
^@alilc/lowcode\-(${pkgNames.join('|')})$
```

- `^`: 匹配字符串开头
- `@alilc/lowcode\-`: 匹配包名前缀
- `(${pkgNames.join('|')})`: 匹配包名称列表中的任意一个
- `$`: 匹配字符串结尾

**示例映射**:
```
@alilc/lowcode-react-renderer -> <rootDir>/../react-renderer/src
@alilc/lowcode-renderer-core -> <rootDir>/../renderer-core/src
@alilc/lowcode-types -> <rootDir>/../types/src
```

**用途**:
- 在测试中直接导入本地包，无需发布
- 支持本地包之间的相互引用
- 加快测试开发速度

## 测试配置示例

### 运行测试

```bash
npm test
```

**功能**: 运行所有测试。

**输出**:
- 测试结果
- 代码覆盖率报告

### 运行特定测试

```bash
npm test -- tests/index.test.tsx
```

**功能**: 运行特定的测试文件。

### 查看覆盖率

```bash
npm test -- --coverage
```

**功能**: 生成详细的覆盖率报告。

**输出目录**:
- `coverage/` 目录
- 包含 HTML、JSON、LCOV 等格式的报告

## 配置说明

### 为什么使用 moduleNameMapper

1. **本地开发**: 在本地开发时，包可能还未发布到 NPM
2. **快速迭代**: 修改本地包后立即测试，无需重新发布
3. **依赖管理**: 简化本地包之间的依赖关系
4. **CI/CD**: 在 CI/CD 环境中也能正确解析本地包

### 为什么收集 src/**/*.ts 的覆盖率

1. **源代码覆盖**: 只关注源代码的测试覆盖率
2. **排除类型文件**: `.d.ts` 文件不包含可执行代码
3. **排除依赖**: 不收集第三方依赖的覆盖率
4. **准确性**: 提供更准确的覆盖率数据

### transformIgnorePatterns 的作用

1. **性能优化**: 跳过不需要转换的模块，提高测试速度
2. **兼容性**: 某些 ES 模块可能需要被转换才能在 Jest 中运行
3. **灵活性**: 可以根据需要调整哪些模块需要转换

## 与其他配置文件的关系

### 与 package.json 的关系

| 配置文件 | 用途 |
|---------|------|
| [`jest.config.js`](packages/react-renderer/jest.config.js) | Jest 测试配置 |
| [`package.json`](packages/react-renderer/package.json) | 测试脚本定义 |

**测试脚本**:
```json
{
  "scripts": {
    "test": "build-scripts test --config build.test.json"
  }
}
```

### 与 build.test.json 的关系

| 配置文件 | 用途 |
|---------|------|
| [`jest.config.js`](packages/react-renderer/jest.config.js) | Jest 运行时配置 |
| [`build.test.json`](packages/react-renderer/build.test.json) | 测试构建配置 |

**协作方式**:
1. [`build.test.json`](packages/react-renderer/build.test.json) 配置测试构建流程
2. [`jest.config.js`](packages/react-renderer/jest.config.js) 配置测试运行时行为

## 最佳实践

### 1. 模块名称映射

- **本地包**: 使用 `moduleNameMapper` 映射本地包
- **第三方包**: 直接从 `node_modules` 导入
- **路径别名**: 可以配置路径别名简化导入

### 2. 代码覆盖率

- **设置阈值**: 在 CI/CD 中设置覆盖率阈值
- **关注关键路径**: 优先覆盖核心功能
- **定期审查**: 定期审查覆盖率报告

### 3. 测试性能

- **并行测试**: 利用 Jest 的并行测试能力
- **选择性测试**: 开发时只运行相关测试
- **缓存机制**: 利用 Jest 的缓存机制加速测试

## 常见问题

### 1. 模块找不到

**问题**: 测试时出现 "Cannot find module" 错误

**解决方案**:
- 检查 `moduleNameMapper` 配置是否正确
- 确认包名称是否在 `pkgNames` 列表中
- 验证路径映射是否正确

### 2. 覆盖率不准确

**问题**: 覆盖率报告不准确

**解决方案**:
- 检查 `collectCoverageFrom` 配置
- 确认是否排除了不必要的文件
- 验证测试是否覆盖了所有分支

### 3. 测试运行缓慢

**问题**: 测试运行速度慢

**解决方案**:
- 检查 `transformIgnorePatterns` 配置
- 减少不必要的转换
- 使用 Jest 的并行测试功能

## 相关文件

- [`package.json`](packages/react-renderer/package.json): NPM 包配置
- [`build.test.json`](packages/react-renderer/build.test.json): 测试构建配置
- [`tests/index.test.tsx`](packages/react-renderer/tests/index.test.tsx): 测试文件
- [`tests/fixtures/schema/basic.ts`](packages/react-renderer/tests/fixtures/schema/basic.ts): 测试数据

## 总结

[`jest.config.js`](packages/react-renderer/jest.config.js) 是 React Renderer 模块的测试配置中心，通过配置模块名称映射、转换忽略模式、代码覆盖率收集等选项，实现了高效的测试流程。该配置确保了本地包的正确导入、测试覆盖率的准确收集，以及测试性能的优化，为开发、测试和 CI/CD 提供了完整的测试支持。
