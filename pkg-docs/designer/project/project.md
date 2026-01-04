# Project - 项目管理

## 功能概述

[`Project`](packages/designer/src/project/project.ts:90) 是低代码引擎的项目管理类，负责管理多个文档、模拟器、配置等。

## 主要功能

1. **文档管理**：管理多个文档，支持文档的创建、打开、关闭、切换
2. **模拟器管理**：管理模拟器实例
3. **配置管理**：管理项目配置
4. **国际化管理**：管理国际化资源
5. **Schema 管理**：管理项目 schema 的导入导出
6. **组件映射**：管理项目中使用的组件映射
7. **工具映射**：管理项目中使用的工具函数
8. **事件分发**：发送项目相关的事件

## 类定义

```typescript
export class Project implements IProject {
  private emitter: IEventBus = createModuleEventBus('Project');
  
  @obx.shallow readonly documents: IDocumentModel[] = [];
  
  private data: IPublicTypeProjectSchema = {
    version: '1.0.0',
    componentsMap: [],
    componentsTree: [],
    i18n: {},
  };
  
  private _simulator?: ISimulatorHost;
  private isRendererReady: boolean = false;
  
  readonly designer: IDesigner;
  
  @computed get simulator(): ISimulatorHost | null;
  @computed get currentDocument(): IDocumentModel | null | undefined;
  @obx private _config: any = {};
  @computed get config(): any;
  set config(value: any);
  @obx.ref private _i18n: any = {};
  @computed get i18n(): any;
  set i18n(value: any);
  
  private documentsMap = new Map<string, DocumentModel>();
  
  constructor(readonly designer: IDesigner, schema?: IPublicTypeProjectSchema, readonly viewName = 'global');
  
  private getComponentsMap(): IPublicTypeComponentsMap;
  getSchema(stage: IPublicEnumTransformStage = IPublicEnumTransformStage.Save): IPublicTypeProjectSchema;
  setSchema(schema?: IPublicTypeProjectSchema): void;
  @action
  load(schema?: IPublicTypeProjectSchema, autoOpen?: boolean | string): void;
  unload(): void;
  removeDocument(doc: IDocumentModel): void;
  set<T extends keyof IPublicTypeProjectSchema>(key: T, value: IPublicTypeProjectSchema[T]): void;
  set(key: string, value: unknown): void;
  get<T extends keyof IPublicTypeRootSchema>(key: T): IPublicTypeRootSchema[T];
  get<T>(key: string): T;
  get(key: string): unknown;
  getDocument(id: string): IDocumentModel | null;
  getDocumentByFileName(fileName: string): IDocumentModel | null;
  @action
  createDocument(data?: IPublicTypeRootSchema): IDocumentModel;
  open(doc?: string | IDocumentModel | IPublicTypeRootSchema): IDocumentModel | null;
  checkExclusive(activeDoc: DocumentModel): void;
  closeOthers(opened: DocumentModel): void;
  mountSimulator(simulator: ISimulatorHost): void;
  setRendererReady(renderer: any): void;
  onSimulatorReady(fn: (args: any) => void): () => void;
  onRendererReady(fn: () => void): () => void;
  onCurrentDocumentChange(fn: (doc: IDocumentModel) => void): () => void;
}
```

## 主要属性

### documents
文档列表，存储所有文档实例。

类型：`IDocumentModel[]`

### simulator
模拟器实例。

类型：`ISimulatorHost | null`

### currentDocument
当前激活的文档。

类型：`IDocumentModel | null | undefined`

### config
项目配置。

类型：`any`

### i18n
国际化资源。

类型：`{ [local: string]: { [key: string]: any } }`

## 主要方法

### constructor(designer: IDesigner, schema?: IPublicTypeProjectSchema, viewName = 'global')
构造函数，初始化项目实例。

**参数：**
- `designer`: 设计器实例
- `schema`: 项目 schema（可选）
- `viewName`: 视图名称（默认 'global'）

**初始化流程：**
1. 设置 designer 和 viewName
2. 调用 load 方法加载 schema

### load(schema?: IPublicTypeProjectSchema, autoOpen?: boolean | string)
加载项目 schema。

**参数：**
- `schema`: 项目 schema
- `autoOpen`: 是否自动打开（true 或指定文件名）

**功能：**
- 调用 unload 卸载当前项目
- 合并新的 schema 数据
- 设置配置和国际化
- 如果 autoOpen 为 true，自动打开第一个文档
- 如果 autoOpen 为文件名，打开指定文档

**使用示例：**
```typescript
project.load({
  version: '1.0.0',
  componentsMap: [],
  componentsTree: [{
    componentName: 'Page',
    fileName: 'index',
    props: {},
    children: [],
  }],
  i18n: {},
}, true);
```

### unload()
卸载当前项目。

**功能：**
- 删除所有文档
- 清空文档映射

**使用示例：**
```typescript
project.unload();
```

### createDocument(data?: IPublicTypeRootSchema): IDocumentModel
创建文档实例。

**参数：**
- `data`: 文档 schema（可选）

**返回值：** 文档实例

**使用示例：**
```typescript
const doc = project.createDocument({
  componentName: 'Page',
  fileName: 'page1',
  props: {},
  children: [],
});
```

### open(doc?: string | IDocumentModel | IPublicTypeRootSchema): IDocumentModel | null
打开文档。

**参数：**
- `doc`: 文档 ID、文档实例或文档 schema

**返回值：** 打开的文档实例

**功能：**
- 如果 doc 为空，查找空白文档并打开
- 如果 doc 为字符串或数字，通过 ID 或文件名查找文档
- 如果 doc 为文档实例，直接打开
- 如果 doc 为文档 schema，创建并打开新文档

**使用示例：**
```typescript
// 通过 ID 打开
const doc1 = project.open('doc_id');

// 通过文件名打开
const doc2 = project.open('index');

// 通过文档实例打开
const doc3 = project.open(documentInstance);

// 通过 schema 打开
const doc4 = project.open({
  componentName: 'Page',
  fileName: 'page1',
});
```

### removeDocument(doc: IDocumentModel)
移除文档。

**参数：**
- `doc`: 文档实例

**功能：**
- 从 documents 列表中移除文档
- 从 documentsMap 中移除文档

**使用示例：**
```typescript
project.removeDocument(documentInstance);
```

### getDocument(id: string): IDocumentModel | null
根据 ID 获取文档。

**参数：**
- `id`: 文档 ID

**返回值：** 文档实例或 null

**使用示例：**
```typescript
const doc = project.getDocument('doc_id');
if (doc) {
  console.log('Document found:', doc.fileName);
}
```

### getDocumentByFileName(fileName: string): IDocumentModel | null
根据文件名获取文档。

**参数：**
- `fileName`: 文件名

**返回值：** 文档实例或 null

**使用示例：**
```typescript
const doc = project.getDocumentByFileName('index');
if (doc) {
  console.log('Document found:', doc.id);
}
```

### getSchema(stage: IPublicEnumTransformStage): IPublicTypeProjectSchema
获取项目 schema。

**参数：**
- `stage`: 转换阶段（默认 Save）

**返回值：** 项目 schema

**功能：**
- 合并所有文档的组件映射
- 导出所有文档的 schema
- 合并国际化资源

**使用示例：**
```typescript
const schema = project.getSchema('Save');
console.log('Project schema:', schema);
```

### setSchema(schema?: IPublicTypeProjectSchema)
设置项目 schema。

**参数：**
- `schema`: 项目 schema

**功能：**
- 替换当前文档的 schema
- 触发模拟器重新渲染

**使用示例：**
```typescript
project.setSchema({
  componentsTree: [{
    componentName: 'Page',
    children: [],
  }],
});
```

### set<T extends keyof IPublicTypeProjectSchema>(key: T, value: IPublicTypeProjectSchema[T]): void
设置项目属性。

**参数：**
- `key`: 属性键名
- `value`: 属性值

**使用示例：**
```typescript
project.set('config', {
  layout: {
    props: {
      tabBar: {
        items: [
          { path: '/page1', title: '页面1' },
          { path: '/page2', title: '页面2' },
        ],
      },
    },
  },
});
```

### get<T>(key: string): T
获取项目属性。

**参数：**
- `key`: 属性键名

**返回值：** 属性值

**使用示例：**
```typescript
const config = project.get('config');
console.log('Project config:', config);
```

### mountSimulator(simulator: ISimulatorHost)
挂载模拟器。

**参数：**
- `simulator`: 模拟器实例

**功能：**
- 保存模拟器实例
- 发送模拟器就绪事件

**使用示例：**
```typescript
project.mountSimulator(simulatorInstance);
```

### checkExclusive(activeDoc: DocumentModel)
检查并设置独占文档。

**参数：**
- `activeDoc`: 激活的文档

**功能：**
- 暂停其他所有文档
- 发送当前文档变化事件

**使用示例：**
```typescript
project.checkExclusive(documentInstance);
```

### onCurrentDocumentChange(fn: (doc: IDocumentModel) => void): () => void
监听当前文档变化事件。

**参数：**
- `fn`: 事件处理函数

**返回值：** 清理函数

**使用示例：**
```typescript
const dispose = project.onCurrentDocumentChange((doc) => {
  console.log('Current document changed:', doc.fileName);
});

// 清理
dispose();
```

## 注意事项

1. **文档 ID 唯一性**：文档 ID 在项目中必须唯一
2. **文件名唯一性**：同一项目中文档文件名应该唯一
3. **文档生命周期**：文档有打开、关闭、暂停、激活等状态
4. **模拟器唯一性**：一个项目只能有一个模拟器实例
5. **配置更新**：更新配置后会触发相关事件
6. **事件监听清理**：监听事件后记得清理

## 相关文件

- [`../document/document-model.ts`](../document/document-model.md) - 文档模型
- [`../designer/designer.ts`](../designer/designer.ts) - 设计器核心
- [`../builtin-simulator/host.ts`](../builtin-simulator/host.md) - 模拟器宿主

## 外部依赖

- `@alilc/lowcode-editor-core`: 编辑器核心库
- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-utils`: 工具函数
