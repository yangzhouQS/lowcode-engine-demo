# Props - 属性管理

## 功能概述

[`Props`](packages/designer/src/document/node/props/props.ts:45) 是低代码引擎的属性管理器，负责管理节点的属性。

## 主要功能

1. **属性管理**：管理节点的所有属性
2. **属性获取**：获取指定路径的属性值
3. **属性设置**：设置指定路径的属性值
4. **属性删除**：删除指定路径的属性
5. **属性导出**：导出属性的 JSON 结构
6. **属性导入**：导入属性的 JSON 结构
7. **属性监听**：监听属性变化
8. **属性转换**：支持属性转换器

## 类定义

```typescript
export class Props implements IProps {
  readonly node: Node;
  readonly id: string;
  readonly emitter: IEventBus = createModuleLogger('Props');
  
  @obx.shallow private _props: PropsMap = {};
  private _path: string[];
  private _items: Prop[] = [];
  
  constructor(node: Node, value?: PropsMap, extras?: PropsExtra);
  
  get path(): string[];
  get props(): PropsMap;
  get items(): Prop[];
  get size(): number;
  
  get(propPath: string | number, createIfNone?: boolean): Prop | null;
  has(propPath: string | number): boolean;
  add(prop: Prop, stage?: boolean): void;
  delete(propPath: string | number): void;
  merge(props: PropsMap, stage?: boolean): void;
  export(stage: boolean): PropsMap;
  import(props: PropsMap, stage?: boolean): void;
  
  dispose(): void;
}
```

## 主要属性

### node
节点实例。

类型：`Node`

### id
属性 ID。

类型：`string`

### path
属性路径。

类型：`string[]`

### props
属性映射。

类型：`PropsMap`

### items
属性列表。

类型：`Prop[]`

### size
属性数量。

类型：`number`

## 主要方法

### get(propPath: string | number, createIfNone?: boolean): Prop | null
获取指定路径的属性。

**参数：**
- `propPath`: 属性路径
- `createIfNone`: 如果不存在是否创建（默认 false）

**返回值：** 属性对象或 null

**使用示例：**
```typescript
const prop = props.get('props.className');
if (prop) {
  console.log('Prop value:', prop.value);
}
```

### has(propPath: string | number): boolean
检查属性是否存在。

**参数：**
- `propPath`: 属性路径

**返回值：** 是否存在

**使用示例：**
```typescript
if (props.has('props.className')) {
  console.log('Prop exists');
}
```

### add(prop: Prop, stage?: boolean): void
添加属性。

**参数：**
- `prop`: 属性对象
- `stage`: 是否暂存（默认 false）

**使用示例：**
```typescript
const prop = new Prop(props, 'props.className', 'my-class');
props.add(prop);
```

### delete(propPath: string | number): void
删除属性。

**参数：**
- `propPath`: 属性路径

**使用示例：**
```typescript
props.delete('props.className');
```

### merge(props: PropsMap, stage?: boolean): void
合并属性。

**参数：**
- `props`: 属性映射
- `stage`: 是否暂存（默认 false）

**使用示例：**
```typescript
props.merge({
  props: {
    className: 'my-class',
    style: { color: 'red' },
  },
});
```

### export(stage: boolean): PropsMap
导出属性的 JSON 结构。

**参数：**
- `stage`: 是否包含暂存的属性

**返回值：** 属性映射

**使用示例：**
```typescript
const propsMap = props.export(false);
console.log('Exported props:', propsMap);
```

### import(props: PropsMap, stage?: boolean): void
导入属性的 JSON 结构。

**参数：**
- `props`: 属性映射
- `stage`: 是否暂存（默认 false）

**使用示例：**
```typescript
props.import({
  props: {
    className: 'my-class',
    style: { color: 'red' },
  },
});
```

## 使用示例

### 获取属性值

```typescript
// 获取属性
const prop = props.get('props.className');
if (prop) {
  console.log('Prop value:', prop.value);
}

// 检查属性是否存在
if (props.has('props.className')) {
  console.log('Prop exists');
}
```

### 设置属性值

```typescript
// 创建属性
const prop = new Prop(props, 'props.className', 'my-class');
props.add(prop);

// 合并属性
props.merge({
  props: {
    className: 'my-class',
    style: { color: 'red' },
  },
});
```

### 删除属性

```typescript
// 删除属性
props.delete('props.className');
```

### 导出和导入

```typescript
// 导出属性
const propsMap = props.export(false);
console.log('Exported props:', propsMap);

// 导入属性
props.import({
  props: {
    className: 'my-class',
    style: { color: 'red' },
  },
});
```

### 监听属性变化

```typescript
// 监听属性变化
props.emitter.on('change', (prop) => {
  console.log('Prop changed:', prop.path, prop.value);
});
```

### 遍历属性

```typescript
// 遍历所有属性
props.items.forEach((prop) => {
  console.log('Prop:', prop.path, prop.value);
});

// 获取属性数量
console.log('Props count:', props.size);
```

## 注意事项

1. **属性路径**：属性路径使用点号分隔，如 `props.className`
2. **暂存属性**：暂存属性不会立即生效，需要手动提交
3. **属性唯一性**：同一个路径只能有一个属性
4. **属性顺序**：属性列表的顺序与添加顺序一致
5. **属性导出**：导出的属性可以用于保存和恢复
6. **属性导入**：导入属性会覆盖已存在的属性
7. **性能优化**：使用 @obx.shallow 装饰器优化性能

## 相关文件

- [`../node.ts`](../node.md) - 节点类
- [`prop.ts`](./prop.md) - 属性类

## 外部依赖

- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-editor-core`: 编辑器核心库
