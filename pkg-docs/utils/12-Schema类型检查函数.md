# Schema 类型检查函数 API 设计文档

## 概述

本文档包含 utils 模块中 `check-types` 目录下的所有 Schema 类型检查函数的 API 设计说明。这些函数用于判断低代码引擎中的各种 Schema 类型。

## 函数列表

### 1. isNodeSchema

判断数据是否为节点 Schema。

```typescript
export function isNodeSchema(data: any): data is IPublicTypeNodeSchema
```

**参数**:
- `data`: 要判断的数据

**返回值**: 如果是节点 Schema 返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isNodeSchema } from '@alilc/lowcode-utils';

const nodeSchema = {
  componentName: 'Div',
  props: {
    className: 'container'
  }
};

console.log(isNodeSchema(nodeSchema)); // true
console.log(isNodeSchema({ componentName: 'Component' })); // false
console.log(isNodeSchema({})); // false
```

**实现细节**:
```typescript
export function isNodeSchema(data: any): data is IPublicTypeNodeSchema {
  if (!isObject(data)) {
    return false;
  }
  return 'componentName' in data && !data.isNode;
}
```

**判断逻辑**:
1. 检查是否为对象
2. 检查是否有 `componentName` 属性
3. 检查 `isNode` 不为 `true`

---

### 2. isComponentSchema

判断数据是否为组件 Schema。

```typescript
export function isComponentSchema(schema: any): schema is IPublicTypeComponentSchema
```

**参数**:
- `schema`: 要判断的 Schema

**返回值**: 如果是组件 Schema 返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isComponentSchema } from '@alilc/lowcode-utils';

const componentSchema = {
  componentName: 'Component',
  title: 'My Component',
  docUrl: 'https://example.com/docs',
  screenshot: 'https://example.com/screenshot.png',
  devMode: 'proCode',
  npm: {
    package: 'my-component',
    version: '1.0.0',
    exportName: 'MyComponent'
  }
};

console.log(isComponentSchema(componentSchema)); // true
console.log(isComponentSchema({ componentName: 'Div' })); // false
```

**实现细节**:
```typescript
export function isComponentSchema(schema: any): schema is IPublicTypeComponentSchema {
  if (typeof schema === 'object') {
    return schema.componentName === 'Component';
  }
  return false
}
```

**判断逻辑**:
1. 检查是否为对象
2. 检查 `componentName` 是否为 `'Component'`

---

### 3. isJSExpression

判断数据是否为 JS 表达式。

```typescript
export function isJSExpression(data: any): data is IPublicTypeJSExpression
```

**参数**:
- `data`: 要判断的数据

**返回值**: 如果是 JS 表达式返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isJSExpression } from '@alilc/lowcode-utils';

const jsExpression = {
  type: 'JSExpression',
  value: 'this.state.count',
  extType: 'statement'
};

console.log(isJSExpression(jsExpression)); // true
console.log(isJSExpression({ type: 'JSExpression', extType: 'function' })); // false
console.log(isJSExpression({ type: 'string' })); // false
```

**实现细节**:
```typescript
export function isJSExpression(data: any): data is IPublicTypeJSExpression {
  if (!isObject(data)) {
    return false;
  }
  return data.type === 'JSExpression' && data.extType !== 'function';
}
```

**判断逻辑**:
1. 检查是否为对象
2. 检查 `type` 是否为 `'JSExpression'`
3. 检查 `extType` 不为 `'function'`

**注意**: 为了避免把 `{ type: 'JSExpression', extType: 'function' }` 误判为表达式，增加了 `extType !== 'function'` 的判断。

---

### 4. isJSSlot

判断数据是否为 JS 插槽。

```typescript
export function isJSSlot(data: any): data is IPublicTypeJSSlot
```

**参数**:
- `data`: 要判断的数据

**返回值**: 如果是 JS 插槽返回 `true`，否则返回 `false`

**使用示例**:
```typescript
import { isJSSlot } from '@alilc/lowcode-utils';

const jsSlot = {
  type: 'JSSlot',
  title: '插槽标题',
  value: [
    {
      componentName: 'Div',
      props: {
        className: 'slot-content'
      }
    }
  ]
};

console.log(isJSSlot(jsSlot)); // true
console.log(isJSSlot({ type: 'JSExpression' })); // false
console.log(isJSSlot({})); // false
```

**实现细节**:
```typescript
export function isJSSlot(data: any): data is IPublicTypeJSSlot {
  if (!isObject(data)) {
    return false;
  }
  return data.type === 'JSSlot';
}
```

**判断逻辑**:
1. 检查是否为对象
2. 检查 `type` 是否为 `'JSSlot'`

---

## 其他 Schema 类型检查函数

### 5. isJSBlock

判断数据是否为 JS 代码块。

```typescript
export function isJSBlock(data: any): data is IPublicTypeJSBlock
```

**判断逻辑**: `data.type === 'JSBlock'`

### 6. isI18nData

判断数据是否为国际化数据。

```typescript
export function isI18nData(data: any): data is IPublicTypeI18nData
```

**判断逻辑**: `data.type === 'i18n'`

### 7. isDynamicSetter

判断数据是否为动态 Setter。

```typescript
export function isDynamicSetter(data: any): data is IPublicTypeDynamicSetter
```

**判断逻辑**: `data.type === 'DynamicSetter'`

### 8. isSetterConfig

判断数据是否为 Setter 配置。

```typescript
export function isSetterConfig(data: any): data is IPublicTypeSetterConfig
```

**判断逻辑**: `data.type === 'SetterConfig'`

### 9. isSettingField

判断数据是否为设置字段。

```typescript
export function isSettingField(data: any): data is IPublicTypeSettingField
```

**判断逻辑**: `data.type === 'SettingField'`

### 10. isTitleConfig

判断数据是否为标题配置。

```typescript
export function isTitleConfig(data: any): data is IPublicTypeTitleConfig
```

**判断逻辑**: `data.type === 'TitleConfig'`

### 11. isBasicPropType

判断数据是否为基础属性类型。

```typescript
export function isBasicPropType(data: any): data is IPublicTypeBasicPropType
```

**判断逻辑**: `data.type === 'BasicPropType'`

### 12. isRequiredPropType

判断数据是否为必需属性类型。

```typescript
export function isRequiredPropType(data: any): data is IPublicTypeRequiredPropType
```

**判断逻辑**: `data.type === 'RequiredPropType'`

### 13. isCustomView

判断数据是否为自定义视图。

```typescript
export function isCustomView(data: any): data is IPublicTypeCustomView
```

**判断逻辑**: `data.type === 'CustomView'`

### 14. isActionContentObject

判断数据是否为操作内容对象。

```typescript
export function isActionContentObject(data: any): data is IPublicTypeActionContentObject
```

**判断逻辑**: `data.type === 'ActionContentObject'`

### 15. isDragNodeObject

判断数据是否为拖拽节点对象。

```typescript
export function isDragNodeObject(data: any): data is IPublicTypeDragNodeObject
```

**判断逻辑**: `data.type === 'DragNodeObject'`

### 16. isDragNodeDataObject

判断数据是否为拖拽节点数据对象。

```typescript
export function isDragNodeDataObject(data: any): data is IPublicTypeDragNodeDataObject
```

**判断逻辑**: `data.type === 'DragNodeDataObject'`

### 17. isDragAnyObject

判断数据是否为任意拖拽对象。

```typescript
export function isDragAnyObject(data: any): data is IPublicTypeDragAnyObject
```

**判断逻辑**: `data.type === 'DragAnyObject'`

### 18. isLocationData

判断数据是否为位置数据。

```typescript
export function isLocationData(data: any): data is IPublicTypeLocationData
```

**判断逻辑**: `data.type === 'LocationData'`

### 19. isLocationChildrenDetail

判断数据是否为位置子节点详情。

```typescript
export function isLocationChildrenDetail(data: any): data is IPublicTypeLocationChildrenDetail
```

**判断逻辑**: `data.type === 'LocationChildrenDetail'`

### 20. isDomText

判断数据是否为 DOM 文本。

```typescript
export function isDomText(data: any): data is IPublicTypeDomText
```

**判断逻辑**: `data.type === 'DomText'`

### 21. isLowcodeComponentType

判断数据是否为低代码组件类型。

```typescript
export function isLowcodeComponentType(data: any): data is IPublicTypeLowcodeComponentType
```

**判断逻辑**: `data.type === 'LowcodeComponentType'`

### 22. isProcodeComponentType

判断数据是否为普通代码组件类型。

```typescript
export function isProcodeComponentType(data: any): data is IPublicTypeProcodeComponentType
```

**判断逻辑**: `data.type === 'ProcodeComponentType'`

### 23. isProjectSchema

判断数据是否为项目 Schema。

```typescript
export function isProjectSchema(data: any): data is IPublicTypeProjectSchema
```

**判断逻辑**: 检查项目 Schema 的特征属性

### 24. isLowcodeProjectSchema

判断数据是否为低代码项目 Schema。

```typescript
export function isLowcodeProjectSchema(data: any): data is IPublicTypeLowcodeProjectSchema
```

**判断逻辑**: 检查低代码项目 Schema 的特征属性

### 25. isNode

判断数据是否为节点。

```typescript
export function isNode(data: any): data is IPublicTypeNode
```

**判断逻辑**: 检查节点的特征属性

### 26. isObject

判断数据是否为对象。

```typescript
export function isObject(data: any): data is IPublicTypeObject
```

**判断逻辑**: 检查是否为对象类型

### 27. isFunction

判断数据是否为函数。

```typescript
export function isFunction(data: any): data is IPublicTypeFunction
```

**判断逻辑**: 检查是否为函数类型

## 使用场景

### 1. Schema 类型判断

```typescript
import { isNodeSchema, isComponentSchema, isJSExpression, isJSSlot } from '@alilc/lowcode-utils';

function processSchema(schema: any) {
  if (isNodeSchema(schema)) {
    console.log('Node Schema:', schema.componentName);
  } else if (isComponentSchema(schema)) {
    console.log('Component Schema:', schema.componentName);
  } else if (isJSExpression(schema)) {
    console.log('JS Expression:', schema.value);
  } else if (isJSSlot(schema)) {
    console.log('JS Slot:', schema.title);
  } else {
    console.log('Unknown Schema type');
  }
}
```

### 2. 动态属性处理

```typescript
import { isJSExpression, isJSSlot } from '@alilc/lowcode-utils';

function processPropValue(value: any) {
  if (isJSExpression(value)) {
    // 处理 JS 表达式
    return eval(value.value);
  } else if (isJSSlot(value)) {
    // 处理 JS 插槽
    return renderSlot(value.value);
  }
  // 普通值
  return value;
}
```

### 3. 拖拽操作

```typescript
import { isDragNodeObject, isDragNodeDataObject, isDragAnyObject } from '@alilc/lowcode-utils';

function handleDrag(data: any) {
  if (isDragNodeObject(data)) {
    console.log('Drag Node:', data.nodes);
  } else if (isDragNodeDataObject(data)) {
    console.log('Drag Node Data:', data.data);
  } else if (isDragAnyObject(data)) {
    console.log('Drag Any:', data);
  }
}
```

### 4. 位置处理

```typescript
import { isLocationData, isLocationChildrenDetail } from '@alilc/lowcode-utils';

function handleLocation(location: any) {
  if (isLocationData(location)) {
    console.log('Location:', location.target);
  } else if (isLocationChildrenDetail(location)) {
    console.log('Location Children Detail:', location.index);
  }
}
```

### 5. 组件类型判断

```typescript
import { isLowcodeComponentType, isProcodeComponentType } from '@alilc/lowcode-utils';

function processComponent(component: any) {
  if (isLowcodeComponentType(component)) {
    console.log('Lowcode Component:', component.componentName);
  } else if (isProcodeComponentType(component)) {
    console.log('Procode Component:', component.componentName);
  }
}
```

## 最佳实践

1. **类型守卫**:
   ```typescript
   // ✅ 推荐: 使用类型守卫
   if (isNodeSchema(schema)) {
     // TypeScript 知道 schema 是 IPublicTypeNodeSchema
     console.log(schema.componentName);
   }
   
   // ❌ 不推荐: 使用类型断言
   (schema as IPublicTypeNodeSchema).componentName;
   ```

2. **多类型判断**:
   ```typescript
   // ✅ 推荐: 按优先级判断
   if (isJSExpression(value)) {
     // 处理 JS 表达式
   } else if (isJSSlot(value)) {
     // 处理 JS 插槽
   } else {
     // 处理普通值
   }
   
   // ❌ 不推荐: 使用多个 if
   if (isJSExpression(value)) { ... }
   if (isJSSlot(value)) { ... }
   ```

3. **错误处理**:
   ```typescript
   // ✅ 推荐: 先判断再处理
   if (isJSExpression(value)) {
     try {
       return eval(value.value);
     } catch (error) {
       console.error('Failed to evaluate JS expression:', error);
       return null;
     }
   }
   
   // ❌ 不推荐: 直接处理
   return eval(value.value); // 可能报错
   ```

## 性能考虑

1. **所有函数**: O(1)，简单的属性检查
2. **类型守卫**: 提供类型缩小，优化编译时检查
3. **短路判断**: 大多数函数在第一个条件失败时就返回

## 限制和注意事项

1. **类型依赖**:
   - 所有函数都依赖 `@alilc/lowcode-types` 中的类型定义
   - 类型定义更新可能导致判断失效
   - 需要保持类型定义同步

2. **isJSExpression**:
   - 不判断 `extType === 'function'` 的情况
   - 可能误判其他具有相同结构的对象
   - 只检查 `type` 和 `extType` 属性

3. **isNodeSchema**:
   - 只检查 `componentName` 和 `isNode` 属性
   - 可能误判其他具有相同结构的对象
   - 不验证其他必需属性

4. **isComponentSchema**:
   - 只检查 `componentName === 'Component'`
   - 可能误判其他具有相同属性的对象
   - 不验证其他必需属性

5. **其他函数**:
   - 大多数只检查 `type` 属性
   - 可能误判其他具有相同结构的对象
   - 不验证其他必需属性

## 相关函数

- [`isObject`](./10-类型检查函数.md) - 判断是否为对象类型
- [`isI18NObject`](./10-类型检查函数.md) - 判断是否为国际化对象
- [`isPlainObject`](./11-React相关函数.md) - 判断是否为纯对象

## 使用建议

1. **类型守卫**: 使用类型守卫函数进行类型检查和类型缩小
2. **优先级判断**: 按照优先级进行类型判断，避免重复判断
3. **错误处理**: 在处理特定类型前先进行类型判断，避免运行时错误
4. **类型同步**: 保持类型定义与判断函数同步
5. **测试覆盖**: 为所有类型判断函数编写测试用例

## Schema 类型说明

### 节点 Schema (NodeSchema)

```typescript
{
  componentName: string,
  props?: Record<string, any>,
  children?: NodeSchema[],
  // ... 其他属性
}
```

### 组件 Schema (ComponentSchema)

```typescript
{
  componentName: 'Component',
  title: string,
  docUrl?: string,
  screenshot?: string,
  devMode?: 'proCode' | 'lowCode',
  npm?: {
    package: string,
    version: string,
    exportName: string
  },
  // ... 其他属性
}
```

### JS 表达式 (JSExpression)

```typescript
{
  type: 'JSExpression',
  value: string,
  extType?: 'statement' | 'expression' | 'function'
}
```

### JS 插槽 (JSSlot)

```typescript
{
  type: 'JSSlot',
  title?: string,
  value?: NodeSchema[],
  params?: any[],
  // ... 其他属性
}
```

### 国际化数据 (I18nData)

```typescript
{
  type: 'i18n',
  use: string,
  [locale: string]: string
}
```

### JS 代码块 (JSBlock)

```typescript
{
  type: 'JSBlock',
  value: string,
  // ... 其他属性
}
```
