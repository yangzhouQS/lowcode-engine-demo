# @vue3-lowcode/workspace

Vue3 LowCode 工作区包，提供工作区、资源、窗口、上下文和工作台管理功能。

## 功能特性

- **Workspace**: 工作区管理，负责管理文档、模拟器和项目数据
- **Resource**: 资源管理，提供资源的加载、保存和销毁功能
- **EditorWindow**: 编辑器窗口管理，支持窗口的激活、最小化、最大化等操作
- **BasicContext**: 基础上下文管理，提供上下文的数据存储和事件通知
- **Context**: 上下文管理，扩展基础上下文，支持类型、作用域和优先级
- **Workbench**: 工作台管理，统一管理窗口和上下文

## 安装

```bash
pnpm add @vue3-lowcode/workspace
```

## 使用示例

### Workspace

```typescript
import { Workspace } from '@vue3-lowcode/workspace';

// 创建工作区
const workspace = new Workspace(designer, schema);

// 加载项目数据
workspace.load(schema, true);

// 打开文档
const doc = workspace.open();

// 获取当前文档
const currentDoc = workspace.currentDocument;

// 获取项目 schema
const projectSchema = workspace.getSchema('save');
```

### Resource

```typescript
import { Resource } from '@vue3-lowcode/workspace';

// 创建资源
const resource = new Resource('resource-id', 'resource-name', 'resource-type');

// 加载资源
await resource.load();

// 获取资源数据
const data = resource.data;

// 保存资源
await resource.save();

// 监听资源变化
resource.onChange((data) => {
  console.log('Resource changed:', data);
});
```

### EditorWindow

```typescript
import { EditorWindow } from '@vue3-lowcode/workspace';

// 创建窗口
const window = new EditorWindow(workspace, 'window-id', 'Window Title');

// 激活窗口
window.activate();

// 最小化窗口
window.minimize();

// 最大化窗口
window.maximize();

// 恢复窗口
window.restore();

// 关闭窗口
window.close();

// 监听窗口激活
window.onActivate(() => {
  console.log('Window activated');
});
```

### BasicContext

```typescript
import { BasicContext } from '@vue3-lowcode/workspace';

// 创建上下文
const context = new BasicContext('context-id', 'context-name');

// 设置上下文值
context.set('key', 'value');

// 获取上下文值
const value = context.get('key');

// 添加子上下文
const childContext = new BasicContext('child-id', 'child-name');
context.addChild(childContext);

// 监听上下文变化
context.onChange((data) => {
  console.log('Context changed:', data);
});
```

### Context

```typescript
import { Context } from '@vue3-lowcode/workspace';

// 创建上下文
const context = new Context('context-id', 'context-name', 'editor', 'global');

// 设置上下文类型
context.type = 'editor';

// 设置上下文作用域
context.scope = 'global';

// 设置上下文优先级
context.priority = 1;

// 激活上下文
context.activate();

// 停用上下文
context.deactivate();

// 监听上下文激活
context.onActivate(() => {
  console.log('Context activated');
});
```

### Workbench

```typescript
import { Workbench } from '@vue3-lowcode/workspace';

// 创建工作台
const workbench = new Workbench(workspace, 'workbench-id', 'Workbench Name');

// 创建窗口
const window = workbench.createWindow('window-id', 'Window Title');

// 打开窗口
workbench.openWindow(window);

// 激活窗口
workbench.activateWindow(window);

// 创建上下文
const context = workbench.createContext('context-id', 'Context Name', 'editor', 'global');

// 添加上下文
workbench.addContext(context);

// 激活上下文
workbench.activateContext(context);

// 监听窗口变化
workbench.onWindowChange((windows) => {
  console.log('Windows changed:', windows);
});

// 监听上下文变化
workbench.onContextChange((contexts) => {
  console.log('Contexts changed:', contexts);
});
```

## API 文档

### Workspace

| 方法/属性 | 类型 | 描述 |
|-----------|------|------|
| `designer` | `IDesigner` | 获取设计器实例 |
| `simulator` | `ISimulatorHost \| null` | 获取模拟器实例 |
| `currentDocument` | `IDocumentModel \| null \| undefined` | 获取当前文档 |
| `documents` | `IDocumentModel[]` | 获取所有文档 |
| `i18n` | `object` | 获取国际化配置 |
| `load(schema, autoOpen)` | `void` | 加载项目数据 |
| `open(doc)` | `IDocumentModel \| null` | 打开文档 |
| `createDocument(data)` | `IDocumentModel` | 创建文档 |
| `getSchema(stage)` | `IProjectSchema` | 获取项目 schema |
| `getDocument(id)` | `IDocumentModel \| null` | 获取文档 |
| `onCurrentDocumentChange(fn)` | `() => void` | 监听当前文档变化 |

### Resource

| 方法/属性 | 类型 | 描述 |
|-----------|------|------|
| `id` | `string` | 获取资源 ID |
| `name` | `string` | 获取资源名称 |
| `type` | `string` | 获取资源类型 |
| `data` | `any` | 获取/设置资源数据 |
| `meta` | `any` | 获取/设置资源元数据 |
| `loaded` | `boolean` | 是否已加载 |
| `loading` | `boolean` | 是否正在加载 |
| `load()` | `Promise<void>` | 加载资源 |
| `save()` | `Promise<void>` | 保存资源 |
| `destroy()` | `void` | 销毁资源 |
| `onChange(fn)` | `() => void` | 监听资源变化 |

### EditorWindow

| 方法/属性 | 类型 | 描述 |
|-----------|------|------|
| `id` | `string` | 获取窗口 ID |
| `title` | `string` | 获取/设置窗口标题 |
| `workspace` | `IWorkspace` | 获取工作区 |
| `active` | `boolean` | 获取/设置是否激活 |
| `minimized` | `boolean` | 获取/设置是否最小化 |
| `maximized` | `boolean` | 获取/设置是否最大化 |
| `position` | `{ x: number; y: number }` | 获取/设置窗口位置 |
| `size` | `{ width: number; height: number }` | 获取/设置窗口大小 |
| `activate()` | `void` | 激活窗口 |
| `minimize()` | `void` | 最小化窗口 |
| `maximize()` | `void` | 最大化窗口 |
| `restore()` | `void` | 恢复窗口 |
| `close()` | `void` | 关闭窗口 |
| `destroy()` | `void` | 销毁窗口 |
| `onActivate(fn)` | `() => void` | 监听窗口激活 |

### BasicContext

| 方法/属性 | 类型 | 描述 |
|-----------|------|------|
| `id` | `string` | 获取上下文 ID |
| `name` | `string` | 获取/设置上下文名称 |
| `data` | `any` | 获取/设置上下文数据 |
| `meta` | `any` | 获取/设置上下文元数据 |
| `parent` | `IBasicContext \| null` | 获取/设置上下文父级 |
| `children` | `IBasicContext[]` | 获取上下文子级 |
| `addChild(context)` | `void` | 添加子上下文 |
| `removeChild(context)` | `void` | 移除子上下文 |
| `get(key)` | `T` | 获取上下文值 |
| `set(key, value)` | `void` | 设置上下文值 |
| `delete(key)` | `void` | 删除上下文值 |
| `has(key)` | `boolean` | 检查上下文值是否存在 |
| `clear()` | `void` | 清空上下文 |
| `destroy()` | `void` | 销毁上下文 |
| `onChange(fn)` | `() => void` | 监听上下文变化 |

### Context

| 方法/属性 | 类型 | 描述 |
|-----------|------|------|
| `type` | `string` | 获取/设置上下文类型 |
| `scope` | `string` | 获取/设置上下文作用域 |
| `priority` | `number` | 获取/设置上下文优先级 |
| `active` | `boolean` | 获取/设置是否激活 |
| `activate()` | `void` | 激活上下文 |
| `deactivate()` | `void` | 停用上下文 |
| `onActivate(fn)` | `() => void` | 监听上下文激活 |
| `onDeactivate(fn)` | `() => void` | 监听上下文停用 |

### Workbench

| 方法/属性 | 类型 | 描述 |
|-----------|------|------|
| `id` | `string` | 获取工作台 ID |
| `name` | `string` | 获取/设置工作台名称 |
| `workspace` | `IWorkspace` | 获取工作区 |
| `currentWindow` | `IEditorWindow \| null` | 获取当前窗口 |
| `windows` | `IEditorWindow[]` | 获取所有窗口 |
| `currentContext` | `IContext \| null` | 获取当前上下文 |
| `contexts` | `IContext[]` | 获取所有上下文 |
| `active` | `boolean` | 获取/设置是否激活 |
| `createWindow(id, title)` | `IEditorWindow` | 创建窗口 |
| `openWindow(window)` | `void` | 打开窗口 |
| `closeWindow(window)` | `void` | 关闭窗口 |
| `activateWindow(window)` | `void` | 激活窗口 |
| `getWindow(id)` | `IEditorWindow \| null` | 获取窗口 |
| `createContext(id, name, type, scope)` | `IContext` | 创建上下文 |
| `addContext(context)` | `void` | 添加上下文 |
| `removeContext(context)` | `void` | 移除上下文 |
| `activateContext(context)` | `void` | 激活上下文 |
| `getContext(id)` | `IContext \| null` | 获取上下文 |
| `activate()` | `void` | 激活工作台 |
| `deactivate()` | `void` | 停用工作台 |
| `destroy()` | `void` | 销毁工作台 |
| `onActivate(fn)` | `() => void` | 监听工作台激活 |
| `onWindowChange(fn)` | `() => void` | 监听窗口变化 |
| `onContextChange(fn)` | `() => void` | 监听上下文变化 |

## 技术栈

- Vue 3
- TypeScript
- Vite 6
- pnpm Workspace

## 开发

```bash
# 安装依赖
pnpm install

# 构建
pnpm build

# 测试
pnpm test

# 测试覆盖率
pnpm test:coverage
```

## License

MIT
