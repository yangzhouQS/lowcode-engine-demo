# @vue3-lowcode/types

TypeScript 类型定义包,为 Vue3 LowCode Engine 提供完整的类型系统支持。

## 功能特性

- 📦 完整的 TypeScript 类型定义
- 🔧 支持所有核心模块类型
- 🎨 包含 Vue3 特定类型
- 📝 详细的 JSDoc 注释
- 🧪 完整的测试覆盖

## 包含的类型模块

### Shell API 类型
- `IShell` - Shell API 接口
- `IShellModel` - Shell 模型接口
- `IShellConfig` - Shell 配置接口

### Model 类型
- `IEditor` - 编辑器接口
- `IDesigner` - 设计器接口
- `IDocumentModel` - 文档模型接口
- `IDocument` - 文档接口

### Node 类型
- `INode` - 节点接口
- `IProps` - 属性集合接口
- `IProp` - 属性接口
- `ISlot` - 插槽接口

### Renderer 类型
- `IRuntime` - 运行时接口
- `IRenderer` - 渲染器接口
- `IRendererProps` - 渲染器属性接口
- `IBaseRendererInstance` - 基础渲染器实例接口

### Plugin 类型
- `IPlugin` - 插件接口
- `IPluginContext` - 插件上下文接口
- `IPluginManager` - 插件管理器接口
- `IPluginConfig` - 插件配置接口

### Material 类型
- `IComponentMeta` - 组件元数据接口
- `IPropMeta` - 属性元数据接口
- `IEventMeta` - 事件元数据接口
- `ISlotMeta` - 插槽元数据接口
- `ISchema` - Schema 接口

### Vue3 特定类型
- `IVueComponent` - Vue3 组件接口
- `IVueProps` - Vue3 属性接口
- `IVueContext` - Vue3 上下文接口
- `IVueEvent` - Vue3 事件接口

## 安装

```bash
pnpm add @vue3-lowcode/types
```

## 使用方法

### 导入所有类型

```typescript
import type {
  IShell,
  IEditor,
  INode,
  IRenderer,
  IPlugin,
  IComponentMeta,
  IVueComponent
} from '@vue3-lowcode/types';
```

### 导入特定模块类型

```typescript
import type { IShell, IShellConfig } from '@vue3-lowcode/types';
import type { IEditor, IDesigner } from '@vue3-lowcode/types';
import type { INode, IProps, IProp } from '@vue3-lowcode/types';
```

### 使用类型定义

```typescript
import type { IShell, IShellConfig } from '@vue3-lowcode/types';

const shellConfig: IShellConfig = {
  designer: {},
  editor: {},
  engine: {},
  plugins: []
};

class Shell implements IShell {
  private _documentModel: any;
  private _selection: any;
  private _history: any;
  private _project: any;
  private _editor: any;
  private _designer: any;
  private _engine: any;
  private _pluginManager: any;
  private _eventBus: any;
  private _command: any;
  private _config: IShellConfig;
  private _hotkey: any;
  private _intl: any;
  private _container: any;

  constructor(config: IShellConfig) {
    this._config = config;
  }

  async init(): Promise<void> {
    // 初始化逻辑
  }

  async start(): Promise<void> {
    // 启动逻辑
  }

  async stop(): Promise<void> {
    // 停止逻辑
  }

  async dispose(): Promise<void> {
    // 销毁逻辑
  }

  get documentModel() {
    return this._documentModel;
  }

  get selection() {
    return this._selection;
  }

  // ... 其他 getter 方法
}
```

## API 文档

### IShell

Shell API 接口,提供统一的入口点访问所有核心模块。

```typescript
interface IShell {
  init(): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  dispose(): Promise<void>;
  readonly documentModel: any;
  readonly selection: any;
  readonly history: any;
  readonly project: any;
  readonly editor: IEditor;
  readonly designer: IDesigner;
  readonly engine: any;
  readonly pluginManager: IPluginManager;
  readonly eventBus: any;
  readonly command: any;
  readonly config: IShellConfig;
  readonly hotkey: any;
  readonly intl: any;
  readonly container: any;
}
```

### IEditor

编辑器接口,管理编辑器的核心功能。

```typescript
interface IEditor {
  id: string;
  name: string;
  version: string;
  init(): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  dispose(): Promise<void>;
  readonly designer: IDesigner;
  readonly eventBus: any;
  readonly command: any;
  readonly config: any;
  readonly hotkey: any;
  readonly intl: any;
  readonly container: any;
  readonly setterRegistry: any;
}
```

### INode

节点接口,表示低代码页面中的组件节点。

```typescript
interface INode {
  id: string;
  type: string;
  componentName: string;
  getProp(path: string): any;
  setProp(path: string, value: any): void;
  getProps(): any;
  setProps(props: any): void;
  addChild(node: any): void;
  removeChild(node: any): void;
  getChildren(): any[];
  getParent(): any;
  getSibling(index: number): any;
  getIndex(): number;
  export(): any;
}
```

### IComponentMeta

组件元数据接口,描述组件的基本信息和配置。

```typescript
interface IComponentMeta {
  componentName: string;
  title: string;
  description?: string;
  icon?: string;
  tags?: string[];
  category?: string;
  npm?: {
    package: string;
    version: string;
    exportName?: string;
    main?: string;
    destructuring?: boolean;
    subName?: string;
  };
  props?: Record<string, any>;
  events?: Record<string, any>;
  slots?: Record<string, any>;
  configure?: {
    component?: any;
    props?: Record<string, any>;
    supports?: Record<string, any>;
    advanced?: Record<string, any>;
  };
  defaultProps?: Record<string, any>;
  defaultSlots?: Record<string, any>;
  isContainer?: boolean;
  isNesting?: boolean;
  isEditable?: boolean;
  isCopyable?: boolean;
  isDeletable?: boolean;
}
```

### IVueComponent

Vue3 组件接口,定义 Vue3 组件的基本类型。

```typescript
interface IVueComponent<P = any, E = any> {
  name?: string;
  props?: P;
  emits?: E;
  slots?: Record<string, any>;
  setup?: () => any;
  beforeCreate?: () => void;
  created?: () => void;
  beforeMount?: () => void;
  mounted?: () => void;
  beforeUpdate?: () => void;
  updated?: () => void;
  beforeUnmount?: () => void;
  unmounted?: () => void;
  errorCaptured?: (err: Error, instance: any, info: string) => boolean | void;
  renderTracked?: (e: any) => void;
  renderTriggered?: (e: any) => void;
  activated?: () => void;
  deactivated?: () => void;
}
```

## 开发

### 构建包

```bash
pnpm build
```

### 运行测试

```bash
pnpm test
```

### 类型检查

```bash
pnpm type-check
```

## 贡献

欢迎贡献!请阅读 [CONTRIBUTING.md](../../CONTRIBUTING.md) 了解如何参与项目开发。

## 许可证

[MIT](../../LICENSE)

## 相关链接

- [Vue3 LowCode Engine 主仓库](../../)
- [开发计划](../../pkg-docs/vue3-development-plan.md)
- [文档](../../docs/)
