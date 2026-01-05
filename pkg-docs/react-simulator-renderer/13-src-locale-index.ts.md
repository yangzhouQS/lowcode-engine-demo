# src/locale/index.ts 文档

## 文件路径

`packages/react-simulator-renderer/src/locale/index.ts`

## 功能概述

该文件提供了国际化（i18n）工具函数，用于创建国际化实例，支持多语言切换。

## 主要功能

1. **国际化实例**: 创建国际化实例
2. **文本翻译**: 提供文本翻译功能
3. **React 节点翻译**: 提供创建 React 节点的翻译功能
4. **多语言支持**: 支持中文和英文

## 代码分析

### 完整代码

```typescript
import { createElement } from 'react';
import enUS from './en-US.json';
import zhCN from './zh-CN.json';

const instance: Record<string, Record<string, string>> = {
  'zh-CN': zhCN as Record<string, string>,
  'en-US': enUS as Record<string, string>,
};

export function createIntl(locale: string = 'zh-CN') {
  const intl = (id: string) => {
    return instance[locale]?.[id] || id;
  };

  const intlNode = (id: string) => createElement('span', instance[locale]?.[id] || id);

  return {
    intl,
    intlNode,
  };
}
```

### 逐行解释

**第 1 行**:
```typescript
import { createElement } from 'react';
```
- 从 React 导入 createElement 函数
- 用于创建 React 元素

**第 2-3 行**:
```typescript
import enUS from './en-US.json';
import zhCN from './zh-CN.json';
```
- 导入英文和中文语言包
- `enUS`: 英文语言包
- `zhCN`: 中文语言包

**第 5-8 行**:
```typescript
const instance: Record<string, Record<string, string>> = {
  'zh-CN': zhCN as Record<string, string>,
  'en-US': enUS as Record<string, string>,
};
```
- 定义语言包实例
- 使用 Record 类型定义实例类型
- 包含中文和英文两种语言包
- 使用 `as` 类型断言确保类型正确

**第 10-21 行**:
```typescript
export function createIntl(locale: string = 'zh-CN') {
  const intl = (id: string) => {
    return instance[locale]?.[id] || id;
  };

  const intlNode = (id: string) => createElement('span', instance[locale]?.[id] || id);

  return {
    intl,
    intlNode,
  };
}
```
- 导出 `createIntl` 函数
- 参数 `locale`: 语言代码，默认为 'zh-CN'
- `intl`: 文本翻译函数
  - 参数 `id`: 翻译键
  - 返回对应语言的翻译文本，如果不存在则返回键本身
- `intlNode`: React 节点翻译函数
  - 参数 `id`: 翻译键
  - 返回包含翻译文本的 span 元素
- 返回包含 `intl` 和 `intlNode` 的对象

## 使用示例

### 基本使用

```typescript
import { createIntl } from './locale';

// 创建中文国际化实例
const { intl } = createIntl('zh-CN');
console.log(intl('Drag and drop components or templates here'));
// 输出: 拖拽组件或模版到这里

// 创建英文国际化实例
const { intl: intlEn } = createIntl('en-US');
console.log(intlEn('Drag and drop components or templates here'));
// 输出: Drag and drop components or templates here
```

### 使用 intlNode

```typescript
import { createIntl } from './locale';

const { intlNode } = createIntl('zh-CN');

// 在 JSX 中使用
<div>
  {intlNode('Drag and drop components or templates here')}
</div>
```

### 在组件中使用

```typescript
import { createIntl } from './locale';

class MyComponent extends Component {
  render() {
    const { intl } = createIntl(this.props.locale);
    return (
      <div>
        {intl('Drag and drop components or templates here')}
      </div>
    );
  }
}
```

## 注意事项

1. **默认语言**: 默认使用中文（'zh-CN'）
2. **回退机制**: 如果翻译不存在，返回键本身
3. **类型安全**: 使用 TypeScript 类型定义确保类型安全
4. **React 节点**: `intlNode` 返回的是 React 元素，不是字符串

## 相关文件

- **[`en-US.json`](14-src-locale-en-US.json.md)**: 英文语言包
- **[`zh-CN.json`](15-src-locale-zh-CN.json.md)**: 中文语言包

## 设计模式

### 工厂模式

使用工厂函数创建国际化实例：

```typescript
export function createIntl(locale: string = 'zh-CN') {
  // 创建国际化实例
  return { intl, intlNode };
}
```

### 策略模式

根据不同的语言策略返回不同的翻译：

```typescript
const intl = (id: string) => {
  return instance[locale]?.[id] || id;
};
```

## 最佳实践

1. **语言切换**: 在应用中提供语言切换功能
2. **默认语言**: 设置合理的默认语言
3. **回退机制**: 提供回退机制，避免显示空白
4. **类型安全**: 使用 TypeScript 类型定义确保类型安全
5. **文档**: 为翻译键添加文档说明

## 总结

`locale/index.ts` 提供了国际化工具函数，用于创建国际化实例，支持多语言切换。该文件提供了 `intl` 和 `intlNode` 两个函数，分别用于文本翻译和 React 节点翻译。

主要特点：
- **简单性**: 提供简单的 API
- **灵活性**: 支持多种语言
- **回退机制**: 如果翻译不存在，返回键本身
- **类型安全**: 使用 TypeScript 类型定义
- **React 集成**: 提供 React 节点翻译功能
