# Vue3 LowCode Engine 使用指南

本指南详细介绍了如何使用 Vue3 低代码引擎的各个模块和功能。

## 📚 目录

- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [Shell API 使用](#shell-api-使用)
- [编辑器核心](#编辑器核心)
- [设计器](#设计器)
- [渲染器](#渲染器)
- [插件系统](#插件系统)
- [工作区](#工作区)
- [编辑器骨架](#编辑器骨架)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Vue >= 3.4.0
- TypeScript >= 5.3.0

### 安装依赖

```bash
cd vue3-packages
pnpm install
```

### 构建所有包

```bash
pnpm build
```

### 运行示例应用

```bash
cd apps/example-app
pnpm dev
```

访问 http://localhost:3000 查看应用。

## 📁 项目结构

```
vue3-packages/
├── packages/                    # 核心包目录
│   ├── types/               # 类型定义包
│   ├── utils/               # 工具函数包
│   ├── editor-core/         # 编辑器核心包
│   ├── designer/            # 设计器包
│   ├── renderer-core/        # 渲染器核心包
│   ├── vue-renderer/        # Vue 渲染器包
│   ├── vue-simulator-renderer/  # Vue 模拟器渲染器包
│   ├── editor-skeleton/     # 编辑器骨架包
│   ├── workspace/           # 工作区包
│   ├── plugin/              # 插件系统包
│   └── shell/               # Shell API 包
├── apps/                      # 应用目录
│   └── example-app/        # 示例应用
├── docs/                      # 文档目录
│   ├── architecture.md       # 架构设计文档
│   ├── api.md               # API 文档
│   └── USAGE_GUIDE.md       # 本使用指南
├── pnpm-workspace.yaml       # pnpm 工作区配置
├── package.json              # 根包配置
└── tsconfig.json             # TypeScript 配置
```

## 🔧 Shell API 使用

Shell API 是低代码引擎的统一入口，提供了对所有核心模块的访问。

### 基础使用

```typescript
import { Shell } from '@vue3-lowcode/shell';

// 创建 Shell 实例
const shell = new Shell({
  container: document.getElementById('app'),
  locale: 'zh-CN',
  editorConfig: {
    debug: true,
    locale: 'zh-CN',
  },
  designerConfig: {
    maxHistorySize: 50,
  },
});

// 初始化 Shell
await shell.init({
  container: document.getElementById('app'),
  locale: 'zh-CN',
  editorConfig: {
    debug: true,
    locale: 'zh-CN',
  },
  designerConfig: {
    maxHistorySize: 50,
  },
});

// 启动 Shell
await shell.start();
```

### 生命周期管理

```typescript
// Shell 生命周期
// 1. 创建实例
const shell = new Shell(config);

// 2. 初始化
await shell.init();

// 3. 启动
await shell.start();

// 4. 停止
await shell.stop();

// 5. 销毁
await shell.dispose();
```

### 访问核心模块

```typescript
// 获取编辑器
const editor = shell.getEditor();
if (editor) {
  // 使用编辑器功能
  const eventBus = editor.getEventBus();
  const command = editor.getCommand();
}

// 获取设计器
const designer = shell.getDesigner();
if (designer) {
  // 使用设计器功能
  const documentModel = designer.getDocumentModel();
  const selection = designer.getSelection();
}

// 获取文档模型
const documentModel = shell.getDocumentModel();
if (documentModel) {
  // 使用文档模型功能
}

// 获取事件总线
const eventBus = shell.getEventBus();
if (eventBus) {
  // 监听事件
  eventBus.on('shell:init', () => {
    console.log('Shell initialized');
  });
}

// 获取命令系统
const command = shell.getCommand();
if (command) {
  // 执行命令
  command.execute('some-command', { data: 'value' });
}

// 获取配置
const config = shell.getConfig();
if (config) {
  // 访问配置
  const value = config.get('some-key');
}

// 获取快捷键
const hotkey = shell.getHotkey();
if (hotkey) {
  // 注册快捷键
  hotkey.bind('ctrl+s', () => {
    console.log('Save shortcut triggered');
  });
}

// 获取国际化
const intl = shell.getIntl();
if (intl) {
  // 获取国际化消息
  const message = intl.getMessage('some.key');
}

// 获取容器（DI 容器）
const container = shell.getContainer();
if (container) {
  // 解析依赖
  const editor = container.resolve('editor');
}
```

### 状态管理

```typescript
// 导出当前状态
const state = shell.export();
console.log('Current state:', state);
// 状态包含：
// - config: Shell 配置
// - initialized: 是否已初始化
// - started: 是否已启动
// - editor: 编辑器状态
// - designer: 设计器状态
// - documentModel: 文档模型状态

// 导入状态
const savedState = localStorage.getItem('lowcode-state');
if (savedState) {
  await shell.import(JSON.parse(savedState));
}
```

### 事件监听

```typescript
const eventBus = shell.getEventBus();

// 监听 Shell 生命周期事件
eventBus.on('shell:init', () => {
  console.log('Shell initialized');
});

eventBus.on('shell:start', () => {
  console.log('Shell started');
});

eventBus.on('shell:stop', () => {
  console.log('Shell stopped');
});

eventBus.on('shell:dispose', () => {
  console.log('Shell disposed');
});

// 监听编辑器事件
eventBus.on('editor:init', () => {
  console.log('Editor initialized');
});

eventBus.on('editor:start', () => {
  console.log('Editor started');
});

// 监听设计器事件
eventBus.on('designer:ready', () => {
  console.log('Designer ready');
});

eventBus.on('designer:document-change', (event) => {
  console.log('Document changed:', event);
});

// 监听选区事件
eventBus.on('designer:selection-change', (event) => {
  console.log('Selection changed:', event);
});

// 监听历史记录事件
eventBus.on('designer:history-push', (event) => {
  console.log('History pushed:', event);
});

eventBus.on('designer:history-undo', (event) => {
  console.log('History undone:', event);
});

eventBus.on('designer:history-redo', (event) => {
  console.log('History redone:', event);
});
```

## 🎨 编辑器核心

编辑器核心提供了事件总线、命令系统、配置管理等基础功能。

### EventBus 使用

```typescript
import { EventBus } from '@vue3-lowcode/editor-core';

const eventBus = new EventBus({ debug: true });

// 注册事件监听器
const listener = (data) => {
  console.log('Event received:', data);
};

eventBus.on('custom-event', listener);

// 触发事件
eventBus.emit('custom-event', { message: 'Hello' });

// 移除事件监听器
eventBus.off('custom-event', listener);

// 清除所有监听器
eventBus.clear();
```

### Command 使用

```typescript
import { Command } from '@vue3-lowcode/editor-core';

const command = new Command({ debug: true });

// 注册命令
command.register('save', (data) => {
  console.log('Saving:', data);
  return Promise.resolve({ success: true });
});

command.register('undo', (data) => {
  console.log('Undoing:', data);
  return Promise.resolve({ success: true });
});

// 执行命令
command.execute('save', { data: 'value' })
  .then(result => {
    console.log('Command result:', result);
  });

// 批量执行命令
command.executeBatch([
  { name: 'save', data: { value: 1 } },
  { name: 'save', data: { value: 2 } },
]);

// 清除命令
command.clear();
```

### Config 使用

```typescript
import { Config } from '@vue3-lowcode/editor-core';

const config = new Config({ debug: true });

// 设置配置
config.set('editor.theme', 'dark');

// 获取配置
const theme = config.get('editor.theme');
console.log('Current theme:', theme);

// 合并配置
config.merge({
  'editor.theme': 'dark',
  'editor.fontSize': 14,
});

// 获取所有配置
const allConfig = config.getAll();

// 清除配置
config.clear();
```

### Hotkey 使用

```typescript
import { Hotkey } from '@vue3-lowcode/editor-core';

const hotkey = new Hotkey({ debug: true });

// 注册快捷键
hotkey.bind('ctrl+s', () => {
  console.log('Save shortcut triggered');
});

hotkey.bind('ctrl+z', () => {
  console.log('Undo shortcut triggered');
});

hotkey.bind('ctrl+shift+z', () => {
  console.log('Redo shortcut triggered');
});

// 解除快捷键
hotkey.unbind('ctrl+s');

// 清除所有快捷键
hotkey.clear();
```

### DIContainer 使用

```typescript
import { DIContainer } from '@vue3-lowcode/editor-core';

const container = new DIContainer({ debug: true });

// 注册依赖
container.register('eventBus', eventBusInstance);
container.register('command', commandInstance);
container.register('config', configInstance);

// 解析依赖
const eventBus = container.resolve('eventBus');
const command = container.resolve('command');

// 检查依赖是否存在
const hasEventBus = container.has('eventBus');

// 清除所有依赖
container.clear();
```

### Intl 使用

```typescript
import { Intl } from '@vue3-lowcode/editor-core';

const intl = new Intl({ debug: true });

// 初始化国际化
intl.init('zh-CN', {
  'common.save': '保存',
  'common.cancel': '取消',
  'common.confirm': '确定',
});

// 获取消息
const saveMessage = intl.getMessage('common.save');
console.log('Save message:', saveMessage);

// 切换语言
intl.setLocale('en-US');

// 获取当前语言
const locale = intl.getLocale();

// 清除国际化
intl.clear();
```

## 🎨 设计器

设计器提供了可视化拖拽设计、文档管理、选区管理等功能。

### Designer 使用

```typescript
import { Designer } from '@vue3-lowcode/designer';

const designer = new Designer({
  maxHistorySize: 50,
});

// 初始化设计器
await designer.init();

// 启动设计器
await designer.start();

// 停止设计器
await designer.stop();

// 销毁设计器
await designer.dispose();
```

### DocumentModel 使用

```typescript
import { DocumentModel } from '@vue3-lowcode/designer';

const documentModel = new DocumentModel();

// 初始化
await documentModel.init();

// 启动
await documentModel.start();

// 创建新文档
const document = documentModel.createDocument({
  componentName: 'Page',
  props: {
    title: '新页面',
  },
});

// 获取当前文档
const currentDocument = documentModel.getCurrentDocument();

// 设置当前文档
documentModel.setCurrentDocument(document);

// 监听文档事件
documentModel.on('document:create', (event) => {
  console.log('Document created:', event);
});

documentModel.on('document:change', (event) => {
  console.log('Document changed:', event);
});

documentModel.on('document:delete', (event) => {
  console.log('Document deleted:', event);
});
```

### Selection 使用

```typescript
import { Selection } from '@vue3-lowcode/designer';

const selection = new Selection();

// 选中节点
selection.select(node);

// 选中多个节点
selection.select([node1, node2, node3]);

// 取消选中
selection.deselect(node);

// 清除所有选中
selection.clear();

// 获取选中的节点
const selectedNodes = selection.getNodes();

// 监听选区变化
selection.on('selection:change', (event) => {
  console.log('Selection changed:', event);
});

selection.on('selection:clear', () => {
  console.log('Selection cleared');
});
```

### History 使用

```typescript
import { History } from '@vue3-lowcode/designer';

const history = new History();

// 推进历史记录
history.push({
  type: 'add',
  data: { nodeId: 1, operation: 'create' },
});

// 撤销
history.undo();

// 重做
history.redo();

// 获取当前状态
const state = history.getState();

// 获取历史记录大小
const size = history.size();

// 清除历史记录
history.clear();

// 监听历史记录事件
history.on('history:push', (event) => {
  console.log('History pushed:', event);
});

history.on('history:undo', (event) => {
  console.log('History undone:', event);
});

history.on('history:redo', (event) => {
  console.log('History redone:', event);
});
```

## 🎨 渲染器

渲染器负责将 Schema 渲染为实际的 Vue 组件。

### VueRenderer 使用

```typescript
import { VueRenderer } from '@vue3-lowcode/vue-renderer';
import { VueRuntime } from '@vue3-lowcode/vue-renderer';

const runtime = new VueRuntime();
const renderer = new VueRenderer({
  runtime: runtime,
});

// 渲染组件
const component = renderer.render({
  componentName: 'Button',
  props: {
    type: 'primary',
    onClick: () => console.log('Button clicked'),
  },
});

// 渲染多个组件
const components = renderer.render([
  {
    componentName: 'Button',
    props: { type: 'primary' },
  },
  {
    componentName: 'Input',
    props: { placeholder: '请输入' },
  },
]);

// 渲染带插槽的组件
const componentWithSlot = renderer.render({
  componentName: 'Card',
  props: { title: '标题' },
  children: [
    {
      componentName: 'Button',
      props: { type: 'primary' },
    },
  ],
});
```

### SimulatorRenderer 使用

```typescript
import { SimulatorRenderer } from '@vue3-lowcode/vue-simulator-renderer';

const simulatorRenderer = new SimulatorRenderer({
  // 配置选项
});

// 渲染模拟器
const simulator = simulatorRenderer.render({
  documentModel: documentModel,
  container: document.getElementById('simulator'),
});

// 更新模拟器
simulatorRenderer.update({
  documentModel: newDocumentModel,
});

// 销毁模拟器
simulatorRenderer.dispose();
```

## 🔌 插件系统

插件系统提供了扩展编辑器功能的能力。

### PluginManager 使用

```typescript
import { PluginManager } from '@vue3-lowcode/plugin';

const pluginManager = new PluginManager();

// 注册插件
pluginManager.register({
  name: 'my-plugin',
  version: '1.0.0',
  init: (context) => {
    console.log('Plugin initialized:', context);
    
    // 访问上下文
    const editor = context.get('editor');
    const designer = context.get('designer');
  },
  destroy: (context) => {
    console.log('Plugin destroyed:', context);
  },
});

// 获取所有插件
const plugins = pluginManager.getAll();

// 获取指定插件
const plugin = pluginManager.get('my-plugin');

// 检查插件是否已注册
const isRegistered = pluginManager.has('my-plugin');

// 启动插件
await pluginManager.start('my-plugin');

// 停止插件
await pluginManager.stop('my-plugin');

// 注销插件
pluginManager.unregister('my-plugin');

// 清除所有插件
pluginManager.clear();
```

### VuePlugin 使用

```typescript
import { VuePlugin } from '@vue3-lowcode/plugin';

class MyPlugin extends VuePlugin {
  constructor(config: any) {
    super(config);
  }

  async onStart(): Promise<void> {
    console.log('Plugin started');
    
    // 访问插件上下文
    const editor = this.context.get('editor');
    const designer = this.context.get('designer');
    
    // 注册命令
    const command = this.context.get('command');
    command.register('my-command', this.handleCommand.bind(this));
  }

  async onStop(): Promise<void> {
    console.log('Plugin stopped');
    
    // 清理资源
    const command = this.context.get('command');
    command.unregister('my-command');
  }

  private handleCommand(data: any): Promise<any> {
    console.log('Command executed:', data);
    return Promise.resolve({ success: true });
  }
}

export default new MyPlugin({
  name: 'my-plugin',
  version: '1.0.0',
});
```

## 🏢 工作区

工作区提供了项目管理、物料管理等功能。

### Workspace 使用

```typescript
import { Workspace } from '@vue3-lowcode/workspace';

const workspace = new Workspace();

// 初始化工作区
await workspace.init();

// 获取项目
const project = workspace.getProject();

// 创建新项目
const newProject = workspace.createProject({
  name: '新项目',
  description: '项目描述',
});

// 删除项目
workspace.deleteProject(projectId);

// 监听项目变化
workspace.on('project:create', (event) => {
  console.log('Project created:', event);
});

workspace.on('project:delete', (event) => {
  console.log('Project deleted:', event);
});
```

### Project 使用

```typescript
import { Project } from '@vue3-lowcode/workspace';

const project = new Project({
  name: '我的项目',
  description: '项目描述',
});

// 获取项目信息
const info = project.getInfo();

// 更新项目信息
project.update({
  name: '新名称',
  description: '新描述',
});

// 保存项目
await project.save();

// 加载项目
await project.load();

// 导出项目
const exported = project.export();

// 导入项目
await project.import(exported);
```

### Material 使用

```typescript
import { Material } from '@vue3-lowcode/workspace';

const material = new Material({
  componentName: 'Button',
  title: '按钮',
  description: '按钮组件',
  schema: {
    // 组件 Schema
  props: [
      {
        name: 'type',
        title: '类型',
        type: 'string',
        enum: ['primary', 'success', 'warning', 'danger'],
        default: 'default',
      },
    ],
  },
});

// 获取物料信息
const info = material.getInfo();

// 更新物料
material.update({
  title: '新标题',
});

// 渲染物料
const component = material.render();
```

### MaterialCollection 使用

```typescript
import { MaterialCollection } from '@vue3-lowcode/workspace';

const collection = new MaterialCollection();

// 添加物料
collection.add(material1);
collection.add(material2);

// 获取所有物料
const materials = collection.getAll();

// 查找物料
const buttonMaterial = collection.find('Button');

// 按类别分组
const grouped = collection.groupByCategory();

// 删除物料
collection.remove('Button');

// 清除所有物料
collection.clear();
```

## 🎨 编辑器骨架

编辑器骨架提供了编辑器 UI 的布局和组件管理。

### Skeleton 使用

```typescript
import { Skeleton } from '@vue3-lowcode/editor-skeleton';

const skeleton = new Skeleton();

// 添加区域
skeleton.addArea('left-panel', {
  width: 300,
  components: ['component-tree', 'settings-pane'],
});

// 添加面板
skeleton.addPanel('settings-panel', {
  title: '属性设置',
  component: 'SettingsPane',
});

// 添加组件
skeleton.addWidget('component-tree', {
  title: '组件树',
  component: 'ComponentTree',
});

// 获取区域
const area = skeleton.getArea('left-panel');

// 获取面板
const panel = skeleton.getPanel('settings-panel');

// 获取组件
const widget = skeleton.getWidget('component-tree');

// 移除区域
skeleton.removeArea('left-panel');

// 移除面板
skeleton.removePanel('settings-pane');

// 移除组件
skeleton.removeWidget('component-tree');
```

### Area 使用

```typescript
import { Area } from '@vue3-lowcode/editor-skeleton';

const area = new Area({
  name: 'left-panel',
  width: 300,
  components: [],
});

// 添加组件
area.addComponent('component-tree');

// 移除组件
area.removeComponent('component-tree');

// 获取所有组件
const components = area.getComponents();

// 清除所有组件
area.clear();
```

### Widget 使用

```typescript
import { Widget } from '@vue3-lowcode/editor-skeleton';

const widget = new Widget({
  name: 'component-tree',
  title: '组件树',
  component: 'ComponentTree',
});

// 获取组件
const component = widget.getComponent();

// 更新组件
widget.update({
  title: '新标题',
});

// 渲染组件
const rendered = widget.render();
```

## 💡 最佳实践

### 1. 错误处理

```typescript
try {
  await shell.init();
  await shell.start();
} catch (error) {
  console.error('Failed to initialize shell:', error);
  // 显示错误提示
  ElMessage.error('引擎初始化失败');
}
```

### 2. 性能优化

```typescript
// 使用防抖
import { debounce } from '@vue3-lowcode/utils';

const handleResize = debounce(() => {
  // 处理窗口大小变化
}, 300);

// 使用节流
import { throttle } from '@vue3-lowcode/utils';

const handleScroll = throttle(() => {
  // 处理滚动事件
}, 100);
```

### 3. 内存管理

```typescript
// 及时清理不需要的监听器
const eventBus = shell.getEventBus();

const listener = (data) => {
  console.log('Event:', data);
};

eventBus.on('event-name', listener);

// 组件卸载时移除监听器
onUnmounted(() => {
  eventBus.off('event-name', listener);
});
```

### 4. 类型安全

```typescript
// 使用类型断言
const editor = shell.getEditor();
if (editor) {
  const eventBus = editor.getEventBus();
  // TypeScript 知道 eventBus 不为 null
}

// 使用可选链
const designer = shell.getDesigner();
const documentModel = designer?.getDocumentModel();
```

## ❓ 常见问题

### Q: 如何调试低代码引擎？

A: 
1. 在创建 Shell 时设置 `debug: true`
2. 打开浏览器控制台
3. 通过 `window.__LOWCODE_SHELL__` 访问引擎实例
4. 查看控制台输出的日志信息

### Q: 引擎初始化失败怎么办？

A: 
1. 检查 Node.js 版本 >= 18.0.0
2. 检查 pnpm 版本 >= 8.0.0
3. 确保所有包都已正确构建（`pnpm build`）
4. 检查浏览器控制台的错误信息
5. 确认 `@vue3-lowcode/*` 包是否正确安装

### Q: 如何切换语言？

A: 在 Shell 配置中设置 `locale` 参数：

```typescript
const shell = new Shell({
  locale: 'en-US', // 切换为英文
  // ... 其他配置
});
```

### Q: 如何自定义主题？

A: Element Plus 支持主题定制，可以通过 CSS 变量或 SCSS 变量自定义主题。

### Q: 如何扩展组件库？

A: 
1. 创建自定义组件
2. 创建对应的 Material
3. 将 Material 添加到 MaterialCollection
4. 在设计器中注册组件

### Q: 如何保存和加载项目？

A: 
```typescript
// 保存项目
const state = shell.export();
localStorage.setItem('lowcode-project', JSON.stringify(state));

// 加载项目
const savedState = localStorage.getItem('lowcode-project');
if (savedState) {
  await shell.import(JSON.parse(savedState));
}
```

### Q: 如何实现撤销/重做功能？

A: 
```typescript
const history = shell.getHistory();
if (history) {
  // 撤销
  history.undo();
  
  // 重做
  history.redo();
}
```

### Q: 如何监听文档变化？

A: 
```typescript
const eventBus = shell.getEventBus();

eventBus.on('designer:document-change', (event) => {
  console.log('Document changed:', event);
  // 处理文档变化
});
```

### Q: 如何获取选中的组件？

A: 
```typescript
const designer = shell.getDesigner();
if (designer) {
  const selection = designer.getSelection();
  const selectedNodes = selection.getNodes();
  console.log('Selected nodes:', selectedNodes);
}
```

## 📖 相关资源

- [架构设计文档](./architecture.md)
- [API 文档](./api.md)
- [示例应用](../apps/example-app/README.md)
- [Vue3 官方文档](https://vuejs.org/)
- [Element Plus 官方文档](https://element-plus.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

## 📄 许可证

MIT License
