# @vue3-lowcode/workspace

Vue3 LowCode Engine Workspace - 工作区包，提供项目和物料管理。

## 简介

`@vue3-lowcode/workspace` 是 Vue3 LowCode Engine 的工作区包，负责管理项目和物料集合。它提供了灵活的项目管理、物料管理和物料集合管理能力，支持动态添加、移除和配置项目及物料。

## 特性

- 📁 **项目管理**: 统一管理多个项目，支持项目切换
- 🧩 **物料管理**: 灵活的物料管理，支持多种物料类型
- 📦 **物料集合**: 组织和管理物料集合
- 💾 **自动保存**: 支持自动保存功能
- 🔌 **事件系统**: 完整的事件监听和处理机制
- 🎯 **TypeScript 支持**: 完整的类型定义
- ⚡ **高性能**: 基于 Vue3 的响应式系统

## 安装

```bash
npm install @vue3-lowcode/workspace
# 或
pnpm add @vue3-lowcode/workspace
# 或
yarn add @vue3-lowcode/workspace
```

## 快速开始

### 基础使用

```typescript
import { Workspace } from '@vue3-lowcode/workspace';
import { Designer } from '@vue3-lowcode/designer';

// 创建设计器实例
const designer = new Designer({
  // 设计器配置
});

// 创建工作区实例
const workspace = new Workspace({
  designer,
  name: 'My Workspace',
  description: 'My LowCode Workspace',
  autoSave: true,
  autoSaveInterval: 30000,
});

// 初始化工作区
await workspace.init();
```

### 添加项目

```typescript
// 添加项目
const project = workspace.addProject({
  id: 'project-1',
  name: 'My Project',
  description: 'My first lowcode project',
  version: '1.0.0',
  schema: {
    // 项目 Schema
  },
  metadata: {
    // 自定义数据
  },
});

// 切换到项目
workspace.switchProject('project-1');

// 获取当前项目
const currentProject = workspace.getCurrentProject();
```

### 添加物料集合

```typescript
// 添加物料集合
const materialCollection = workspace.addMaterialCollection({
  id: 'collection-1',
  name: 'Basic Components',
  description: 'Basic component collection',
  materials: [
    {
      id: 'button',
      name: 'Button',
      description: 'Button component',
      type: 'component',
      category: 'Basic',
      icon: 'el-icon-s-operation',
      component: ButtonComponent,
      props: {
        // 组件属性
      },
      tags: ['basic', 'form'],
    },
    {
      id: 'input',
      name: 'Input',
      description: 'Input component',
      type: 'component',
      category: 'Form',
      icon: 'el-icon-edit',
      component: InputComponent,
      props: {
        // 组件属性
      },
      tags: ['form', 'input'],
    },
  ],
});

// 切换到物料集合
workspace.switchMaterialCollection('collection-1');

// 获取当前物料集合
const currentCollection = workspace.getCurrentMaterialCollection();
```

## API 文档

### Workspace

工作区主类，负责管理整个工作区的项目和物料集合。

#### 构造函数

```typescript
constructor(config: WorkspaceConfig, events?: WorkspaceEvents)
```

**参数:**
- `config`: 工作区配置
  - `designer`: 设计器实例
  - `name`: 工作区名称
  - `description`: 工作区描述
  - `autoSave`: 是否启用自动保存
  - `autoSaveInterval`: 自动保存间隔（毫秒）
  - `metadata`: 自定义数据
- `events`: 工作区事件（可选）

#### 方法

##### init()

初始化工作区。

```typescript
async init(): Promise<void>
```

##### destroy()

销毁工作区。

```typescript
destroy(): void
```

##### getConfig()

获取工作区配置。

```typescript
getConfig(): WorkspaceConfig
```

##### setConfig()

设置工作区配置。

```typescript
setConfig(config: Partial<WorkspaceConfig>): void
```

##### getState()

获取工作区状态。

```typescript
getState(): WorkspaceState
```

##### getId()

获取工作区 ID。

```typescript
getId(): string
```

##### getDesigner()

获取设计器实例。

```typescript
getDesigner(): Designer
```

##### addProject()

添加项目。

```typescript
addProject(config: ProjectConfig): Project
```

##### removeProject()

移除项目。

```typescript
removeProject(projectId: string): void
```

##### getProject()

获取项目。

```typescript
getProject(projectId: string): Project | undefined
```

##### getProjects()

获取所有项目。

```typescript
getProjects(): Map<string, Project>
```

##### switchProject()

切换项目。

```typescript
switchProject(projectId: string): void
```

##### getCurrentProject()

获取当前项目。

```typescript
getCurrentProject(): Project | undefined
```

##### addMaterialCollection()

添加物料集合。

```typescript
addMaterialCollection(config: MaterialCollectionConfig): MaterialCollection
```

##### removeMaterialCollection()

移除物料集合。

```typescript
removeMaterialCollection(collectionId: string): void
```

##### getMaterialCollection()

获取物料集合。

```typescript
getMaterialCollection(collectionId: string): MaterialCollection | undefined
```

##### getMaterialCollections()

获取所有物料集合。

```typescript
getMaterialCollections(): Map<string, MaterialCollection>
```

##### switchMaterialCollection()

切换物料集合。

```typescript
switchMaterialCollection(collectionId: string): void
```

##### getCurrentMaterialCollection()

获取当前物料集合。

```typescript
getCurrentMaterialCollection(): MaterialCollection | undefined
```

##### save()

保存工作区。

```typescript
async save(): Promise<void>
```

##### load()

加载工作区。

```typescript
async load(): Promise<void>
```

### Project

项目类，负责管理单个项目。

#### 方法

##### init()

初始化项目。

```typescript
async init(): Promise<void>
```

##### destroy()

销毁项目。

```typescript
destroy(): void
```

##### getConfig()

获取项目配置。

```typescript
getConfig(): ProjectConfig
```

##### setConfig()

设置项目配置。

```typescript
setConfig(config: Partial<ProjectConfig>): void
```

##### getId()

获取项目 ID。

```typescript
getId(): string
```

##### getName()

获取项目名称。

```typescript
getName(): string
```

##### setName()

设置项目名称。

```typescript
setName(name: string): void
```

##### getDescription()

获取项目描述。

```typescript
getDescription(): string | undefined
```

##### setDescription()

设置项目描述。

```typescript
setDescription(description: string): void
```

##### getVersion()

获取项目版本。

```typescript
getVersion(): string | undefined
```

##### setVersion()

设置项目版本。

```typescript
setVersion(version: string): void
```

##### getSchema()

获取项目 Schema。

```typescript
getSchema(): any | undefined
```

##### setSchema()

设置项目 Schema。

```typescript
setSchema(schema: any): void
```

##### isModified()

检查项目是否已修改。

```typescript
isModified(): boolean
```

##### markModified()

标记项目为已修改。

```typescript
markModified(): void
```

##### markSaved()

标记项目为已保存。

```typescript
markSaved(): void
```

##### isSaved()

检查项目是否已保存。

```typescript
isSaved(): boolean
```

##### save()

保存项目。

```typescript
async save(): Promise<void>
```

##### load()

加载项目。

```typescript
async load(): Promise<void>
```

##### clone()

克隆项目。

```typescript
clone(): ProjectConfig
```

### Material

物料类，负责管理单个物料。

#### 方法

##### init()

初始化物料。

```typescript
async init(): Promise<void>
```

##### destroy()

销毁物料。

```typescript
destroy(): void
```

##### getConfig()

获取物料配置。

```typescript
getConfig(): MaterialConfig
```

##### setConfig()

设置物料配置。

```typescript
setConfig(config: Partial<MaterialConfig>): void
```

##### getId()

获取物料 ID。

```typescript
getId(): string
```

##### getName()

获取物料名称。

```typescript
getName(): string
```

##### setName()

设置物料名称。

```typescript
setName(name: string): void
```

##### getType()

获取物料类型。

```typescript
getType(): string
```

##### getCategory()

获取物料分类。

```typescript
getCategory(): string | undefined
```

##### setCategory()

设置物料分类。

```typescript
setCategory(category: string): void
```

##### getIcon()

获取物料图标。

```typescript
getIcon(): string | undefined
```

##### setIcon()

设置物料图标。

```typescript
setIcon(icon: string): void
```

##### getComponent()

获取物料组件。

```typescript
getComponent(): any | undefined
```

##### setComponent()

设置物料组件。

```typescript
setComponent(component: any): void
```

##### getProps()

获取物料属性。

```typescript
getProps(): Record<string, any> | undefined
```

##### setProps()

设置物料属性。

```typescript
setProps(props: Record<string, any>): void
```

##### isAvailable()

检查物料是否可用。

```typescript
isAvailable(): boolean
```

##### setAvailable()

设置物料可用性。

```typescript
setAvailable(available: boolean): void
```

##### getTags()

获取物料标签。

```typescript
getTags(): string[] | undefined
```

##### setTags()

设置物料标签。

```typescript
setTags(tags: string[]): void
```

##### use()

使用物料。

```typescript
use(): void
```

### MaterialCollection

物料集合类，负责管理物料集合。

#### 方法

##### init()

初始化物料集合。

```typescript
async init(): Promise<void>
```

##### destroy()

销毁物料集合。

```typescript
destroy(): void
```

##### getConfig()

获取物料集合配置。

```typescript
getConfig(): MaterialCollectionConfig
```

##### setConfig()

设置物料集合配置。

```typescript
setConfig(config: Partial<MaterialCollectionConfig>): void
```

##### getId()

获取物料集合 ID。

```typescript
getId(): string
```

##### getName()

获取物料集合名称。

```typescript
getName(): string
```

##### setName()

设置物料集合名称。

```typescript
setName(name: string): void
```

##### addMaterial()

添加物料。

```typescript
addMaterial(config: any): Material
```

##### removeMaterial()

移除物料。

```typescript
removeMaterial(materialId: string): void
```

##### getMaterial()

获取物料。

```typescript
getMaterial(materialId: string): Material | undefined
```

##### getMaterials()

获取所有物料。

```typescript
getMaterials(): Map<string, Material>
```

##### getMaterialsByType()

根据类型获取物料。

```typescript
getMaterialsByType(type: string): Material[]
```

##### getMaterialsByCategory()

根据分类获取物料。

```typescript
getMaterialsByCategory(category: string): Material[]
```

##### getMaterialsByTags()

根据标签获取物料。

```typescript
getMaterialsByTags(tags: string[]): Material[]
```

##### searchMaterials()

搜索物料。

```typescript
searchMaterials(keyword: string): Material[]
```

##### getAvailableMaterials()

获取可用的物料。

```typescript
getAvailableMaterials(): Material[]
```

##### getMaterialCount()

获取物料数量。

```typescript
getMaterialCount(): number
```

##### clearMaterials()

清空物料集合。

```typescript
clearMaterials(): void
```

## 事件系统

### Workspace 事件

```typescript
interface WorkspaceEvents {
  onInit?: () => void;
  onDestroy?: () => void;
  onProjectAdd?: (project: ProjectConfig) => void;
  onProjectRemove?: (projectId: string) => void;
  onProjectUpdate?: (project: ProjectConfig) => void;
  onProjectSwitch?: (projectId: string) => void;
  onMaterialAdd?: (material: MaterialConfig) => void;
  onMaterialRemove?: (materialId: string) => void;
  onMaterialUpdate?: (material: MaterialConfig) => void;
  onMaterialCollectionAdd?: (collection: MaterialCollectionConfig) => void;
  onMaterialCollectionRemove?: (collectionId: string) => void;
  onMaterialCollectionUpdate?: (collection: MaterialCollectionConfig) => void;
  onSave?: () => void;
  onLoad?: () => void;
}
```

### Project 事件

```typescript
interface ProjectEvents {
  onInit?: () => void;
  onDestroy?: () => void;
  onUpdate?: (project: ProjectConfig) => void;
  onSave?: (project: ProjectConfig) => void;
  onLoad?: (project: ProjectConfig) => void;
  onModify?: (project: ProjectConfig) => void;
}
```

### Material 事件

```typescript
interface MaterialEvents {
  onInit?: () => void;
  onDestroy?: () => void;
  onUpdate?: (material: MaterialConfig) => void;
  onLoad?: (material: MaterialConfig) => void;
  onUse?: (material: MaterialConfig) => void;
}
```

### MaterialCollection 事件

```typescript
interface MaterialCollectionEvents {
  onInit?: () => void;
  onDestroy?: () => void;
  onMaterialAdd?: (material: MaterialConfig) => void;
  onMaterialRemove?: (materialId: string) => void;
  onMaterialUpdate?: (material: MaterialConfig) => void;
}
```

## 使用示例

### 完整示例

```typescript
import { Workspace } from '@vue3-lowcode/workspace';
import { Designer } from '@vue3-lowcode/designer';
import ButtonComponent from './components/Button.vue';
import InputComponent from './components/Input.vue';
import CardComponent from './components/Card.vue';

// 创建设计器
const designer = new Designer({
  // 设计器配置
});

// 创建工作区
const workspace = new Workspace({
  designer,
  name: 'My Workspace',
  description: 'My LowCode Workspace',
  autoSave: true,
  autoSaveInterval: 30000,
}, {
  onInit: () => {
    console.log('工作区已初始化');
  },
  onProjectAdd: (project) => {
    console.log('项目已添加:', project.name);
  },
  onMaterialAdd: (material) => {
    console.log('物料已添加:', material.name);
  },
});

// 添加项目
const project = workspace.addProject({
  id: 'project-1',
  name: 'My Project',
  description: 'My first lowcode project',
  version: '1.0.0',
  schema: {
    componentName: 'Page',
    children: [],
  },
});

// 添加物料集合
const materialCollection = workspace.addMaterialCollection({
  id: 'collection-1',
  name: 'Basic Components',
  description: 'Basic component collection',
  materials: [
    {
      id: 'button',
      name: 'Button',
      description: 'Button component',
      type: 'component',
      category: 'Basic',
      icon: 'el-icon-s-operation',
      component: ButtonComponent,
      props: {
        type: 'primary',
        size: 'default',
      },
      tags: ['basic', 'form'],
    },
    {
      id: 'input',
      name: 'Input',
      description: 'Input component',
      type: 'component',
      category: 'Form',
      icon: 'el-icon-edit',
      component: InputComponent,
      props: {
        placeholder: 'Please input',
        clearable: true,
      },
      tags: ['form', 'input'],
    },
    {
      id: 'card',
      name: 'Card',
      description: 'Card component',
      type: 'component',
      category: 'Layout',
      icon: 'el-icon-s-grid',
      component: CardComponent,
      props: {
        shadow: 'always',
      },
      tags: ['layout', 'container'],
    },
  ],
});

// 初始化工作区
await workspace.init();

// 切换到项目
workspace.switchProject('project-1');

// 切换到物料集合
workspace.switchMaterialCollection('collection-1');

// 获取当前项目
const currentProject = workspace.getCurrentProject();
console.log('当前项目:', currentProject?.getName());

// 获取当前物料集合
const currentCollection = workspace.getCurrentMaterialCollection();
console.log('当前物料集合:', currentCollection?.getName());

// 搜索物料
const searchResults = currentCollection?.searchMaterials('button');
console.log('搜索结果:', searchResults);

// 根据分类获取物料
const formMaterials = currentCollection?.getMaterialsByCategory('Form');
console.log('表单物料:', formMaterials);

// 销毁工作区
// workspace.destroy();
```

## 最佳实践

### 1. 项目管理

建议使用工作区统一管理多个项目，方便项目切换。

```typescript
// 创建多个项目
const project1 = workspace.addProject({
  id: 'project-1',
  name: 'Project 1',
  // ...
});

const project2 = workspace.addProject({
  id: 'project-2',
  name: 'Project 2',
  // ...
});

// 切换项目
workspace.switchProject('project-1');
```

### 2. 物料组织

合理使用物料集合和分类组织物料。

```typescript
// 创建不同类型的物料集合
const basicCollection = workspace.addMaterialCollection({
  id: 'basic',
  name: 'Basic Components',
  materials: [/* ... */],
});

const formCollection = workspace.addMaterialCollection({
  id: 'form',
  name: 'Form Components',
  materials: [/* ... */],
});

const layoutCollection = workspace.addMaterialCollection({
  id: 'layout',
  name: 'Layout Components',
  materials: [/* ... */],
});
```

### 3. 事件处理

合理使用事件系统，实现组件间的通信。

```typescript
const workspace = new Workspace(config, {
  onProjectAdd: (project) => {
    console.log('项目已添加:', project.name);
    // 执行相关操作
  },
  onProjectSwitch: (projectId) => {
    console.log('项目已切换:', projectId);
    // 执行相关操作
  },
  onMaterialAdd: (material) => {
    console.log('物料已添加:', material.name);
    // 执行相关操作
  },
});
```

### 4. 自动保存

启用自动保存功能，避免数据丢失。

```typescript
const workspace = new Workspace({
  designer,
  autoSave: true,
  autoSaveInterval: 30000, // 30 秒
});
```

### 5. 状态管理

使用状态管理工具（如 Pinia）管理工作区的全局状态。

```typescript
// stores/workspace.ts
import { defineStore } from 'pinia';

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    workspace: null as Workspace | null,
  }),
  actions: {
    setWorkspace(workspace: Workspace) {
      this.workspace = workspace;
    },
  },
});
```

## TypeScript 支持

本包提供了完整的 TypeScript 类型定义，支持类型检查和智能提示。

```typescript
import type {
  WorkspaceConfig,
  ProjectConfig,
  MaterialConfig,
  MaterialCollectionConfig,
  WorkspaceEvents,
} from '@vue3-lowcode/workspace';

// 类型安全的配置
const config: WorkspaceConfig = {
  designer,
  name: 'My Workspace',
  autoSave: true,
  autoSaveInterval: 30000,
};
```

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 许可证

MIT

## 贡献

欢迎贡献！请查看 [贡献指南](../../CONTRIBUTING.md) 了解详情。

## 相关包

- [@vue3-lowcode/types](../types) - 类型定义包
- [@vue3-lowcode/utils](../utils) - 工具库包
- [@vue3-lowcode/designer](../designer) - 设计器包
- [@vue3-lowcode/renderer-core](../renderer-core) - 渲染器核心包
- [@vue3-lowcode/vue-renderer](../vue-renderer) - Vue3 渲染器包
- [@vue3-lowcode/vue-simulator-renderer](../vue-simulator-renderer) - Vue3 模拟器渲染器包
- [@vue3-lowcode/editor-skeleton](../editor-skeleton) - 编辑器骨架包
