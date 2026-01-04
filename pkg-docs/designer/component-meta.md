# ComponentMeta - 组件元数据管理

## 功能概述

[`ComponentMeta`](packages/designer/src/component-meta.ts:29) 是低代码引擎的组件元数据管理器，负责管理组件的元数据，包括属性配置、行为配置、组件描述等。

## 主要功能

1. **元数据管理**：管理组件的元数据配置
2. **属性配置**：管理组件的属性配置（props）
3. **行为配置**：管理组件的行为配置（behaviors）
4. **组件描述**：管理组件的描述信息（description）
5. **嵌套规则**：管理组件的嵌套规则（nestingRule）
6. **默认值**：管理组件的默认值
7. **可用操作**：管理组件的可用操作
8. **元数据转换**：支持元数据转换器
9. **setter 注册**：管理 setter 注册表
10. **高级特性**：支持高级特性如 isContainer、isModal 等

## 类定义

```typescript
export class ComponentMeta implements IPublicModelComponentMeta {
  readonly [isComponentMeta]: boolean;
  readonly componentName: string;
  readonly title: string;
  readonly description: string | undefined;
  readonly docUrl: string | undefined;
  readonly screenshot: string | undefined;
  readonly devMode: boolean;
  readonly icon: string | undefined;
  readonly tags: string[] | undefined;
  readonly keywords: string[] | undefined;
  readonly experimental?: boolean;
  
  @obx.shallow readonly props: IPublicTypePropsMap | undefined;
  @obx.shallow readonly propsExtends: IPublicTypePropsTransducer[] | undefined;
  @obx.shallow readonly configure: IPublicTypeComponentConfigure | undefined;
  @obx.shallow readonly advanced: IPublicTypeAdvanced | undefined;
  @obx.shallow readonly supports: IPublicTypeSupports | undefined;
  
  readonly isContainer: boolean;
  readonly isModal: boolean;
  readonly isMinimalRenderUnit: boolean;
  readonly isNullNode: boolean;
  readonly isTopFixed: boolean;
  readonly isLayout: boolean;
  readonly rootSelector: string | undefined;
  readonly isCell: boolean;
  readonly parentRule: IPublicTypeParentRule | undefined;
  readonly childRules: IPublicTypeChildRule[] | undefined;
  readonly descriptor: IPublicTypeNodeSchema | undefined;
  readonly availableActions: IPublicTypeComponentAction[];
  
  private readonly metadataTransducers: IPublicTypeMetadataTransducer[];
  private readonly setterMap: IPublicTypeSetterMap;
  
  constructor(
    componentName: string,
    metadata: IPublicTypeComponentMetadata,
    options: {
      isRoot: boolean;
      metadataTransducers: IPublicTypeMetadataTransducer[];
      setterMap: IPublicTypeSetterMap;
    }
  );
  
  getProp(path: string): IPublicTypePropsMap | IPublicTypePropsTransducer | undefined;
  getMetadata(): IPublicTypeComponentMetadata;
  getNestingRule(): IPublicTypeNestingRule | undefined;
  checkNestingRule(target: ComponentMeta): boolean;
  getConfigure(name: string): IPublicTypeComponentConfigure | IPublicTypeFieldConfig | undefined;
  getSupportedBehaviors(): string[];
  isSupportBehavior(behaviorName: string): boolean;
  isNullComponent(): boolean;
}
```

## 主要属性

### componentName
组件名称。

类型：`string`

### title
组件标题。

类型：`string`

### description
组件描述。

类型：`string | undefined`

### docUrl
组件文档 URL。

类型：`string | undefined`

### screenshot
组件截图 URL。

类型：`string | undefined`

### icon
组件图标。

类型：`string | undefined`

### tags
组件标签。

类型：`string[] | undefined`

### keywords
组件关键词。

类型：`string[] | undefined`

### devMode
是否开发模式。

类型：`boolean`

### experimental
是否实验性组件。

类型：`boolean | undefined`

### props
属性配置映射。

类型：`IPublicTypePropsMap | undefined`

### propsExtends
属性扩展转换器列表。

类型：`IPublicTypePropsTransducer[] | undefined`

### configure
组件配置。

类型：`IPublicTypeComponentConfigure | undefined`

### advanced
高级配置。

类型：`IPublicTypeAdvanced | undefined`

### supports
支持的功能。

类型：`IPublicTypeSupports | undefined`

### isContainer
是否容器组件。

类型：`boolean`

### isModal
是否模态框组件。

类型：`boolean`

### isMinimalRenderUnit
是否最小渲染单元。

类型：`boolean`

### isNullNode
是否空节点。

类型：`boolean`

### isTopFixed
是否顶部固定。

类型：`boolean`

### isLayout
是否布局组件。

类型：`boolean`

### rootSelector
根选择器。

类型：`string | undefined`

### isCell
是否单元格组件。

类型：`boolean`

### parentRule
父节点规则。

类型：`IPublicTypeParentRule | undefined`

### childRules
子节点规则。

类型：`IPublicTypeChildRule[] | undefined`

### descriptor
节点描述符。

类型：`IPublicTypeNodeSchema | undefined`

### availableActions
可用操作列表。

类型：`IPublicTypeComponentAction[]`

## 主要方法

### getProp(path: string): IPublicTypePropsMap | IPublicTypePropsTransducer | undefined
获取属性配置。

**参数：**
- `path`: 属性路径

**返回值：** 属性配置或转换器

**使用示例：**
```typescript
const propConfig = componentMeta.getProp('props.className');
console.log('Prop config:', propConfig);
```

### getMetadata(): IPublicTypeComponentMetadata
获取组件元数据。

**返回值：** 组件元数据对象

**使用示例：**
```typescript
const metadata = componentMeta.getMetadata();
console.log('Component metadata:', metadata);
```

### getNestingRule(): IPublicTypeNestingRule | undefined
获取嵌套规则。

**返回值：** 嵌套规则对象

**使用示例：**
```typescript
const nestingRule = componentMeta.getNestingRule();
if (nestingRule) {
  console.log('Parent rule:', nestingRule.parentRule);
  console.log('Child rules:', nestingRule.childRules);
}
```

### checkNestingRule(target: ComponentMeta): boolean
检查嵌套规则是否允许目标组件作为子节点。

**参数：**
- `target`: 目标组件元数据

**返回值：** 是否允许嵌套

**功能：**
1. 如果没有子节点规则，返回 true
2. 遍历所有子节点规则
3. 检查目标组件是否匹配规则
4. 如果匹配，返回 true
5. 否则返回 false

**使用示例：**
```typescript
const canNest = componentMeta.checkNestingRule(targetComponentMeta);
if (canNest) {
  console.log('Target component can be nested');
} else {
  console.log('Target component cannot be nested');
}
```

### getConfigure(name: string): IPublicTypeComponentConfigure | IPublicTypeFieldConfig | undefined
获取配置项。

**参数：**
- `name`: 配置项名称

**返回值：** 配置项对象

**使用示例：**
```typescript
const config = componentMeta.getConfigure('props');
console.log('Config:', config);
```

### getSupportedBehaviors(): string[]
获取支持的行为列表。

**返回值：** 行为名称列表

**使用示例：**
```typescript
const behaviors = componentMeta.getSupportedBehaviors();
console.log('Supported behaviors:', behaviors);
```

### isSupportBehavior(behaviorName: string): boolean
检查是否支持指定行为。

**参数：**
- `behaviorName`: 行为名称

**返回值：** 是否支持

**使用示例：**
```typescript
if (componentMeta.isSupportBehavior('lock')) {
  console.log('Component supports lock behavior');
}
```

### isNullComponent(): boolean
检查是否是空组件。

**返回值：** 是否是空组件

**使用示例：**
```typescript
if (componentMeta.isNullComponent()) {
  console.log('This is a null component');
}
```

## 元数据结构

### IPublicTypeComponentMetadata
组件元数据类型定义。

```typescript
export interface IPublicTypeComponentMetadata {
  componentName: string;
  title?: string;
  description?: string;
  docUrl?: string;
  screenshot?: string;
  devMode?: boolean;
  icon?: string;
  tags?: string[];
  keywords?: string[];
  experimental?: boolean;
  props?: IPublicTypePropsMap | IPublicTypePropsTransducer[];
  propsExtends?: IPublicTypePropsTransducer[];
  configure?: IPublicTypeComponentConfigure;
  advanced?: IPublicTypeAdvanced;
  supports?: IPublicTypeSupports;
  // ... 其他属性
}
```

### IPublicTypePropsMap
属性配置映射。

```typescript
export type IPublicTypePropsMap = {
  [key: string]: IPublicTypeFieldConfig;
};
```

### IPublicTypeFieldConfig
字段配置。

```typescript
export interface IPublicTypeFieldConfig {
  name: string;
  title?: string;
  type?: string;
  description?: string;
  defaultValue?: any;
  setter?: IPublicTypeSetterType | IPublicTypeSetterType[];
  extraProps?: IPublicTypeFieldExtraProps;
  // ... 其他属性
}
```

### IPublicTypeComponentConfigure
组件配置。

```typescript
export interface IPublicTypeComponentConfigure {
  component?: IPublicTypeNodeSchema;
  props?: IPublicTypePropsMap | IPublicTypePropsTransducer[];
  supports?: IPublicTypeSupports;
  advanced?: IPublicTypeAdvanced;
  // ... 其他属性
}
```

### IPublicTypeSupports
支持的功能。

```typescript
export interface IPublicTypeSupports {
  className?: string;
  style?: string;
  classNameList?: string[];
  styleList?: string[];
  // ... 其他属性
}
```

### IPublicTypeAdvanced
高级配置。

```typescript
export interface IPublicTypeAdvanced {
  isContainer?: boolean;
  isModal?: boolean;
  isMinimalRenderUnit?: boolean;
  isNullNode?: boolean;
  isTopFixed?: boolean;
  isLayout?: boolean;
  rootSelector?: string;
  isCell?: boolean;
  // ... 其他属性
}
```

### IPublicTypeNestingRule
嵌套规则。

```typescript
export interface IPublicTypeNestingRule {
  parentRule?: IPublicTypeParentRule;
  childRules?: IPublicTypeChildRule[];
}
```

### IPublicTypeParentRule
父节点规则。

```typescript
export interface IPublicTypeParentRule {
  parentWhitelist?: string[];
  parentBlacklist?: string[];
  isRoot?: boolean;
}
```

### IPublicTypeChildRule
子节点规则。

```typescript
export interface IPublicTypeChildRule {
  childWhitelist?: string[];
  childBlacklist?: string[];
  desc?: string;
}
```

## 使用示例

### 获取组件元数据

```typescript
const componentMeta = designer.getComponentMeta('Button');
console.log('Component name:', componentMeta.componentName);
console.log('Component title:', componentMeta.title);
console.log('Component description:', componentMeta.description);
```

### 获取属性配置

```typescript
const propConfig = componentMeta.getProp('props.type');
if (propConfig) {
  console.log('Prop title:', propConfig.title);
  console.log('Prop type:', propConfig.type);
  console.log('Prop setter:', propConfig.setter);
}
```

### 检查嵌套规则

```typescript
const parentMeta = designer.getComponentMeta('Container');
const childMeta = designer.getComponentMeta('Button');

const canNest = parentMeta.checkNestingRule(childMeta);
if (canNest) {
  console.log('Button can be nested in Container');
} else {
  console.log('Button cannot be nested in Container');
}
```

### 获取可用操作

```typescript
const actions = componentMeta.availableActions;
actions.forEach(action => {
  console.log('Action name:', action.name);
  console.log('Action title:', action.content.title);
});
```

### 检查高级特性

```typescript
if (componentMeta.isContainer) {
  console.log('This is a container component');
}

if (componentMeta.isModal) {
  console.log('This is a modal component');
}

if (componentMeta.isMinimalRenderUnit) {
  console.log('This is a minimal render unit');
}
```

### 获取支持的行为

```typescript
const behaviors = componentMeta.getSupportedBehaviors();
if (behaviors.includes('lock')) {
  console.log('Component supports lock behavior');
}

if (componentMeta.isSupportBehavior('hide')) {
  console.log('Component supports hide behavior');
}
```

## 注意事项

1. **元数据转换**：元数据转换器会按优先级依次执行，修改元数据
2. **属性扩展**：propsExtends 可以扩展属性配置
3. **嵌套规则**：嵌套规则用于控制组件之间的父子关系
4. **行为支持**：behaviors 用于控制组件支持的操作
5. **高级特性**：advanced 用于控制组件的高级特性
6. **setter 映射**：setterMap 用于将 setter 名称映射到 setter 组件
7. **性能优化**：使用 @obx.shallow 装饰器优化性能
8. **类型安全**：所有类型都使用 IPublicType 前缀，表示公开类型

## 相关文件

- [`component-actions.ts`](./component-actions.md) - 组件操作管理
- [`designer/designer.ts`](./designer/designer.md) - 设计器核心
- [`document/node/node.ts`](./document/node/node.md) - 节点类
- [`../types/index.ts`](./types/index.md) - 类型定义

## 外部依赖

- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-editor-core`: 编辑器核心库
- `@alilc/lowcode-utils`: 工具函数
