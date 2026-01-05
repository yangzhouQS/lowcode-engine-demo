# src/code-result.ts - 代码结果类型定义

## 文件路径
`packages/types/src/code-result.ts`

## 文件概述
定义了代码生成结果的结构类型，用于描述代码生成器生成的文件和目录结构。这些类型在代码生成过程中使用，用于组织和管理生成的代码文件。

## 功能说明

### 主要职责
1. **文件结构定义**: 定义生成代码的文件和目录结构
2. **代码生成支持**: 为代码生成器提供类型支持
3. **文件组织**: 描述如何组织生成的代码文件

## 类型定义详解

### 1. ResultDir
导出内容的文件夹结构接口。

```typescript
/**
 * 导出内容结构，文件夹
 *
 * @export
 * @interface ResultDir
 */
export interface ResultDir {
  /**
   * 文件夹名称，Root 名称默认为 .
   *
   * @type {string}
   * @memberof ResultDir
   */
  name: string;
  /**
   * 子目录
   *
   * @type {ResultDir[]}
   * @memberof ResultDir
   */
  dirs: ResultDir[];
  /**
   * 文件夹内文件
   *
   * @type {ResultFile[]}
   * @memberof ResultDir
   */
  files: ResultFile[];
}
```

**字段详细说明**:

#### name
- **类型**: `string`
- **必填**: 是
- **说明**: 文件夹名称
- **示例**: `"src"`, `"components"`, `"."` (根目录)
- **使用场景**:
  - 定义文件夹名称
  - 根目录使用 `.` 表示
  - 支持多级目录结构

#### dirs
- **类型**: `ResultDir[]`
- **必填**: 是
- **说明**: 子目录数组
- **示例**:
  ```typescript
  [
    {
      name: 'components',
      dirs: [],
      files: [...]
    },
    {
      name: 'pages',
      dirs: [],
      files: [...]
    }
  ]
  ```
- **使用场景**:
  - 定义子目录结构
  - 支持多级嵌套
  - 组织代码文件

#### files
- **类型**: `ResultFile[]`
- **必填**: 是
- **说明**: 文件夹内的文件数组
- **示例**:
  ```typescript
  [
    {
      name: 'index.tsx',
      ext: '.tsx',
      content: '...'
    },
    {
      name: 'App.tsx',
      ext: '.tsx',
      content: '...'
    }
  ]
  ```
- **使用场景**:
  - 定义文件夹内的文件
  - 存储文件内容和元信息
  - 支持多种文件类型

### 2. ResultFile
导出内容的文件描述接口。

```typescript
/**
 * 导出内容，对文件的描述
 *
 * @export
 * @interface ResultFile
 */
export interface ResultFile {
  /**
   * 文件名
   *
   * @type {string}
   * @memberof ResultFile
   */
  name: string;
  /**
   * 文件类型扩展名，例如 .js .less
   *
   * @type {string}
   * @memberof ResultFile
   */
  ext: string;
  /**
   * 文件内容
   *
   * @type {string}
   * @memberof ResultFile
   */
  content: string;
}
```

**字段详细说明**:

#### name
- **类型**: `string`
- **必填**: 是
- **说明**: 文件名（不包含扩展名）
- **示例**: `"index"`, `"App"`, `"main"`
- **使用场景**:
  - 定义文件名
  - 与 ext 组合形成完整文件名
  - 文件标识

#### ext
- **类型**: `string`
- **必填**: 是
- **说明**: 文件类型扩展名
- **示例**: `".js"`, `".tsx"`, `".less"`, `".css"`, `".json"`
- **使用场景**:
  - 定义文件类型
  - 与 name 组合形成完整文件名
  - 文件类型识别

#### content
- **类型**: `string`
- **必填**: 是
- **说明**: 文件内容
- **示例**:
  ```typescript
  "import React from 'react';\n\nexport default function App() {\n  return <div>Hello World</div>;\n}"
  ```
- **使用场景**:
  - 存储文件内容
  - 代码生成输出
  - 文件写入

## 使用示例

### 基本文件结构
```typescript
import { ResultDir, ResultFile } from '@alilc/lowcode-types';

const resultDir: ResultDir = {
  name: '.',
  dirs: [
    {
      name: 'src',
      dirs: [],
      files: [
        {
          name: 'index',
          ext: '.tsx',
          content: 'import React from "react";\n\nexport default function App() {\n  return <div>Hello World</div>;\n}'
        }
      ]
    }
  ],
  files: [
    {
      name: 'package',
      ext: '.json',
      content: '{\n  "name": "my-app",\n  "version": "1.0.0"\n}'
    }
  ]
};
```

### 多级目录结构
```typescript
const resultDir: ResultDir = {
  name: '.',
  dirs: [
    {
      name: 'src',
      dirs: [
        {
          name: 'components',
          dirs: [],
          files: [
            {
              name: 'Button',
              ext: '.tsx',
              content: 'export default function Button() { return <button>Click</button>; }'
            }
          ]
        },
        {
          name: 'pages',
          dirs: [],
          files: [
            {
              name: 'Home',
              ext: '.tsx',
              content: 'export default function Home() { return <div>Home</div>; }'
            }
          ]
        }
      ],
      files: [
        {
          name: 'App',
          ext: '.tsx',
          content: 'export default function App() { return <div>App</div>; }'
        }
      ]
    },
    {
      name: 'public',
      dirs: [],
      files: [
        {
          name: 'index',
          ext: '.html',
          content: '<!DOCTYPE html>\n<html><body><div id="root"></div></body></html>'
        }
      ]
    }
  ],
  files: [
    {
      name: 'package',
      ext: '.json',
      content: '{\n  "name": "my-app",\n  "version": "1.0.0"\n}'
    },
    {
      name: 'tsconfig',
      ext: '.json',
      content: '{\n  "compilerOptions": {\n    "target": "es5",\n    "module": "commonjs"\n  }\n}'
    }
  ]
};
```

### 代码生成使用
```typescript
// 代码生成器中使用
function generateProjectStructure(): ResultDir {
  return {
    name: '.',
    dirs: [
      {
        name: 'src',
        dirs: [],
        files: [
          {
            name: 'index',
            ext: '.tsx',
            content: generateIndexCode()
          },
          {
            name: 'App',
            ext: '.tsx',
            content: generateAppCode()
          }
        ]
      },
      {
        name: 'styles',
        dirs: [],
        files: [
          {
            name: 'main',
            ext: '.less',
            content: generateStylesCode()
          }
        ]
      }
    ],
    files: [
      {
        name: 'package',
        ext: '.json',
        content: generatePackageJSON()
      }
    ]
  };
}
```

### 遍历文件结构
```typescript
// 遍历文件结构
function traverseDir(dir: ResultDir, callback: (file: ResultFile, path: string) => void, path: string = '') {
  // 处理当前目录的文件
  dir.files.forEach(file => {
    callback(file, `${path}${dir.name === '.' ? '' : dir.name + '/'}${file.name}${file.ext}`);
  });

  // 递归处理子目录
  dir.dirs.forEach(subDir => {
    traverseDir(subDir, callback, `${path}${dir.name === '.' ? '' : dir.name + '/'}`);
  });
}

// 使用示例
traverseDir(resultDir, (file, filePath) => {
  console.log(`File: ${filePath}`);
  console.log(`Content: ${file.content}`);
});
```

### 查找文件
```typescript
// 查找文件
function findFile(dir: ResultDir, fileName: string, ext: string): ResultFile | null {
  // 在当前目录查找
  const file = dir.files.find(f => f.name === fileName && f.ext === ext);
  if (file) return file;

  // 在子目录中查找
  for (const subDir of dir.dirs) {
    const found = findFile(subDir, fileName, ext);
    if (found) return found;
  }

  return null;
}

// 使用示例
const indexFile = findFile(resultDir, 'index', '.tsx');
if (indexFile) {
  console.log(indexFile.content);
}
```

## 设计特点

### 1. 树形结构
- 使用树形结构表示文件系统
- 支持多级嵌套
- 便于遍历和操作

### 2. 类型安全
- 完整的 TypeScript 类型定义
- 严格的类型检查
- 防止结构错误

### 3. 灵活性
- 支持任意文件类型
- 支持任意目录结构
- 适应不同项目需求

### 4. 代码生成支持
- 为代码生成器提供类型支持
- 自动生成文件结构
- 减少手动配置

## 注意事项

1. **文件名和扩展名**: 文件名和扩展名是分开存储的，组合使用时需要注意
2. **根目录**: 根目录的 name 应该是 `.`，表示当前目录
3. **内容存储**: 文件内容存储为字符串，对于大文件可能需要考虑性能
4. **路径处理**: 在遍历和查找文件时，需要正确处理路径拼接
5. **空目录**: 空目录的 dirs 和 files 数组都应该是空数组

## 相关文件

- [`index.ts`](./01-src-index.ts) - 模块入口
- [`code-intermediate.ts`](./04-src-code-intermediate.ts) - 代码中间表示类型

## 版本历史

- **v1.3.2**: 当前版本，包含代码结果类型定义

## 使用建议

1. **路径处理**: 使用辅助函数处理路径拼接，避免手动拼接错误
2. **文件遍历**: 使用递归函数遍历文件结构，确保所有文件都被处理
3. **内容生成**: 对于大型文件，考虑使用流式写入或分块生成
4. **错误处理**: 在文件操作时添加适当的错误处理
5. **性能优化**: 对于大量文件，考虑使用异步操作或批量处理

## 扩展功能

可以基于这些类型实现以下功能：

1. **文件写入**: 将 ResultDir 结构写入实际文件系统
2. **文件比较**: 比较两个 ResultDir 结构的差异
3. **文件合并**: 合并多个 ResultDir 结构
4. **文件过滤**: 根据条件过滤文件
5. **文件统计**: 统计文件数量、行数、大小等信息
