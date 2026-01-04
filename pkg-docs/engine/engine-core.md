# Engine Core 模块文档

## 文件路径

`packages/engine/src/engine-core.ts`

## 功能概述

`engine-core.ts` 是低代码引擎的核心文件，负责初始化和协调所有子系统。它创建了编辑器、设计器、骨架、工作区等核心实例，并提供了引擎的初始化和销毁功能。

## 主要功能

### 1. 引擎初始化

- 创建编辑器实例
- 创建设计器实例
- 创建骨架实例
- 创建工作区实例
- 注册内置插件

### 2. 模块集成

- 集成 Editor Core
- 集成 Designer
- 集成 Skeleton
- 集成 Workspace
- 集成各种 Shell 模块

### 3. 插件上下文组装

- 为每个插件组装 API
- 提供插件上下文
- 管理插件生命周期

### 4. 引擎销毁

- 清理所有文档
- 卸载 DOM 容器
- 清理插件

## 核心变量

### 全局实例

```typescript
const editor = new Editor();
const innerSkeleton = new InnerSkeleton(editor);
const designer = new Designer({ editor, shellModelFactory });
const innerHotkey = new InnerHotkey();
const hotkey = new Hotkey(innerHotkey);
const project = new Project(innerProject);
const skeleton = new Skeleton(innerSkeleton, 'any', false);
const innerSetters = new InnerSetters();
const setters = new Setters(innerSetters);
const innerCommand = new InnerCommand();
const command = new Command(innerCommand, engineContext as IPublicModelPluginContext);
const material = new Material(editor);
const commonUI = new CommonUI(editor);
const config = new Config(engineConfig);
const event = new Event(commonEvent, { prefix: 'common' });
const logger = new Logger({ level: 'warn', bizName: 'common' });
const common = new Common(editor, innerSkeleton);
const canvas = new Canvas(editor);
const innerPlugins = new LowCodePluginManager(pluginContextApiAssembler);
const plugins = new Plugins(innerPlugins).toProxy();
```

### 引擎容器

```typescript
let engineContainer: HTMLElement;
```

用于渲染引擎界面的 DOM 容器。

## 主要函数

### `registryInnerPlugin(designer: IDesigner, editor: IEditor, plugins: IPublicApiPlugins): Promise<IPublicTypeDisposable>`

注册一批内置插件。

**参数:**
- `designer`: 设计器实例
- `editor`: 编辑器实例
- `plugins`: 插件管理器

**返回值:** Promise，解析为清理函数

**行为:**
- 注册组件元数据解析器
- 注册默认面板
- 注册大纲面板插件
- 注册 Setter 注册器
- 注册默认面板注册器
- 注册内置快捷键
- 注册默认配置
- 注册默认右键菜单
- 注册命令插件

**返回的清理函数:**
```typescript
return () => {
  plugins.delete(OutlinePlugin.pluginName);
  plugins.delete(componentMetaParserPlugin.pluginName);
  plugins.delete(setterRegistry.pluginName);
  plugins.delete(defaultPanelRegistryPlugin.pluginName);
  plugins.delete(builtinHotkey.pluginName);
  plugins.delete(registerDefaults.pluginName);
  plugins.delete(defaultContextMenu.pluginName);
  plugins.delete(CommandPlugin.pluginName);
};
```

### `init(container?: HTMLElement, options?: IPublicTypeEngineOptions, pluginPreference?: PluginPreference): Promise<void>`

初始化引擎。

**参数:**
- `container`: DOM 容器（可选），可以是 HTMLElement 或配置对象
- `options`: 引擎选项（可选）
- `pluginPreference`: 插件偏好设置（可选）

**行为:**
- 如果 container 是对象，则视为 options，自动创建容器
- 如果 container 是 HTMLElement，则使用该容器
- 如果 container 未提供，则自动创建容器并追加到 document.body
- 设置引擎选项
- 根据模式渲染不同的界面

**工作区模式:**
```typescript
if (options && options.enableWorkspaceMode) {
  const disposeFun = await pluginPromise;
  disposeFun && disposeFun();
  render(
    createElement(WorkSpaceWorkbench, {
      workspace: innerWorkspace,
      className: 'engine-main',
      topAreaItemClassName: 'engine-actionitem',
    }),
    engineContainer,
  );
  innerWorkspace.enableAutoOpenFirstWindow = engineConfig.get('enableAutoOpenFirstWindow', true);
  innerWorkspace.setActive(true);
  innerWorkspace.initWindow();
  innerHotkey.activate(false);
  await innerWorkspace.plugins.init(pluginPreference);
  return;
}
```

**普通模式:**
```typescript
await plugins.init(pluginPreference as any);

render(
  createElement(Workbench, {
    skeleton: innerSkeleton,
    className: 'engine-main',
    topAreaItemClassName: 'engine-actionitem',
  }),
  engineContainer,
);
```

### `destroy(): Promise<void>`

销毁引擎。

**行为:**
- 移除所有文档
- 卸载 DOM 容器
- 触发 React 组件卸载生命周期

```typescript
export async function destroy() {
  // remove all documents
  const { documents } = project;
  if (Array.isArray(documents) && documents.length > 0) {
    documents.forEach(((doc: IPublicModelDocumentModel) => project.removeDocument(doc)));
  }

  // TODO: delete plugins except for core plugins

  // unmount DOM container, this will trigger React componentWillUnmount lifeCycle,
  // so necessary cleanups will be done.
  engineContainer && unmountComponentAtNode(engineContainer);
}
```

## 插件上下文 API 组装器

```typescript
const pluginContextApiAssembler: ILowCodePluginContextApiAssembler = {
  assembleApis: (context: ILowCodePluginContextPrivate, pluginName: string, meta: IPublicTypePluginMeta) => {
    context.hotkey = hotkey;
    context.project = project;
    context.skeleton = new Skeleton(innerSkeleton, pluginName, false);
    context.setters = setters;
    context.material = material;
    const eventPrefix = meta?.eventPrefix || 'common';
    const commandScope = meta?.commandScope;
    context.event = new Event(commonEvent, { prefix: eventPrefix });
    context.config = config;
    context.common = common;
    context.canvas = canvas;
    context.plugins = plugins;
    context.logger = new Logger({ level: 'warn', bizName: `plugin:${pluginName}` });
    context.workspace = workspace;
    context.commonUI = commonUI;
    context.command = new Command(innerCommand, context as IPublicModelPluginContext, {
      commandScope,
    });
    context.registerLevel = IPublicEnumPluginRegisterLevel.Default;
    context.isPluginRegisteredInWorkspace = false;
    editor.set('pluginContext', context);
  },
};
```

## 导出的 API

```typescript
export {
  skeleton,
  plugins,
  project,
  setters,
  material,
  config,
  event,
  logger,
  hotkey,
  common,
  workspace,
  canvas,
  commonUI,
  command,
};
```

## 内部符号

```typescript
export const isOpenSource = true;
export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
  symbols,
  classes,
};
```

## 版本信息

```typescript
export const version = VERSION_PLACEHOLDER;
engineConfig.set('ENGINE_VERSION', version);
```

## 使用示例

### 基本初始化

```typescript
import { init } from '@alilc/lowcode-engine';

// 使用默认容器
await init();

// 使用自定义容器
const container = document.getElementById('engine-container');
await init(container);

// 传入配置选项
await init(container, {
  designMode: 'design',
  locale: 'zh-CN',
  device: 'desktop',
});
```

### 工作区模式

```typescript
await init(container, {
  enableWorkspaceMode: true,
  enableAutoOpenFirstWindow: true,
});
```

### 销毁引擎

```typescript
import { destroy } from '@alilc/lowcode-engine';

await destroy();
```

### 使用导出的 API

```typescript
import { skeleton, plugins, project, setters, material } from '@alilc/lowcode-engine';

// 使用骨架
skeleton.add({
  area: 'leftArea',
  name: 'myPanel',
  type: 'Panel',
  content: MyPanelComponent,
});

// 使用插件
plugins.register(MyPlugin, {});

// 使用项目
const currentDocument = project.currentDocument;

// 使用 Setter
setters.registerSetter('mySetter', MySetterComponent);

// 使用物料
material.getAssets();
```

## 注意事项

1. **容器管理**: 引擎会自动管理容器的创建和销毁
2. **插件注册**: 内置插件在初始化时自动注册
3. **文档清理**: 销毁引擎时会清理所有文档
4. **工作区模式**: 工作区模式和普通模式的初始化流程不同
5. **版本兼容**: 引擎版本信息用于兼容性检查
6. **内部符号**: `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` 仅供内部使用

## 相关文件

- [`index.ts`](./index.md) - 模块入口
- [`inner-plugins/builtin-hotkey.ts`](./inner-plugins/builtin-hotkey.md) - 内置快捷键
- [`inner-plugins/component-meta-parser.ts`](./inner-plugins/component-meta-parser.md) - 组件元数据解析
- [`inner-plugins/default-context-menu.ts`](./inner-plugins/default-context-menu.md) - 默认右键菜单
- [`inner-plugins/default-panel-registry.ts`](./inner-plugins/default-panel-registry.md) - 默认面板注册
- [`inner-plugins/setter-registry.ts`](./inner-plugins/setter-registry.md) - Setter 注册
- [`modules/live-editing.ts`](./modules/live-editing.md) - 实时编辑

## 外部依赖

- `@alilc/lowcode-editor-core` - 编辑器核心
- `@alilc/lowcode-editor-skeleton` - 编辑器骨架
- `@alilc/lowcode-designer` - 设计器
- `@alilc/lowcode-workspace` - 工作区
- `@alilc/lowcode-shell` - Shell 模块
- `@alilc/lowcode-plugin-command` - 命令插件
- `@alilc/lowcode-plugin-outline-pane` - 大纲面板插件
- `@alilc/lowcode-types` - 类型定义
- `@alilc/lowcode-utils` - 工具函数
- `react` - React 框架
- `react-dom` - React DOM

## 典型使用场景

1. **初始化编辑器**: 创建低代码编辑器实例
2. **插件开发**: 开发自定义插件扩展编辑器功能
3. **集成开发**: 将低代码引擎集成到现有应用中
4. **多文档管理**: 使用工作区模式管理多个文档
5. **API 访问**: 使用导出的 API 访问引擎功能
