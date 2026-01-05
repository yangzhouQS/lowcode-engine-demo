# Types 模块文档

## 概述

`@alilc/lowcode-types` 是阿里低代码引擎的核心类型定义模块，为整个低代码引擎提供完整的 TypeScript 类型系统。该模块包含 200+ 个类型定义文件，覆盖了低代码引擎的所有核心功能。

## 模块信息

- **包名**: `@alilc/lowcode-types`
- **版本**: 1.3.2
- **描述**: Types for Ali lowCode engine
- **主要依赖**: 
  - `@alilc/lowcode-datasource-types` ^1.0.0
  - `react` ^16.9
  - `strict-event-emitter-types` ^2.0.0

## 模块定位

Types 模块是低代码引擎的类型基础层，为以下模块提供类型支持：

1. **Editor Core** - 编辑器核心功能
2. **Renderer** - 渲染器功能
3. **Simulator** - 模拟器功能
4. **Workspace** - 工作区功能
5. **Designer** - 设计器功能
6. **Shell** - Shell API 功能

## 目录结构

```
packages/types/
├── src/
│   ├── index.ts                    # 模块入口，导出所有类型
│   ├── editor.ts                  # 编辑器核心类型
│   ├── activity.ts                # 活动相关类型
│   ├── code-intermediate.ts        # 代码中间类型
│   ├── code-result.ts             # 代码结果类型
│   ├── assets.ts                 # 资源相关类型
│   ├── event/                    # 事件相关类型
│   │   ├── index.ts
│   │   ├── node.ts
│   │   └── prop.ts
│   ├── shell/                    # Shell API 相关类型
│   │   ├── index.ts
│   │   ├── api/                 # Shell API 类型
│   │   │   ├── canvas.ts
│   │   │   ├── command.ts
│   │   │   ├── common.ts
│   │   │   ├── commonUI.ts
│   │   │   ├── event.ts
│   │   │   ├── hotkey.ts
│   │   │   ├── index.ts
│   │   │   ├── logger.ts
│   │   │   ├── material.ts
│   │   │   ├── plugins.ts
│   │   │   ├── project.ts
│   │   │   ├── setters.ts
│   │   │   ├── simulator-host.ts
│   │   │   ├── skeleton.ts
│   │   │   └── workspace.ts
│   │   ├── enum/               # Shell 枚举类型
│   │   │   ├── context-menu.ts
│   │   │   ├── drag-object-type.ts
│   │   │   ├── event-names.ts
│   │   │   ├── index.ts
│   │   │   ├── plugin-register-level.ts
│   │   │   ├── prop-value-changed-type.ts
│   │   │   ├── transform-stage.ts
│   │   │   └── transition-type.ts
│   │   ├── model/              # Shell 模型类型
│   │   │   ├── active-tracker.ts
│   │   │   ├── clipboard.ts
│   │   │   ├── component-meta.ts
│   │   │   ├── detecting.ts
│   │   │   ├── document-model.ts
│   │   │   ├── drag-object.ts
│   │   │   ├── dragon.ts
│   │   │   ├── drop-location.ts
│   │   │   ├── editor-view.ts
│   │   │   ├── editor.ts
│   │   │   ├── engine-config.ts
│   │   │   ├── exclusive-group.ts
│   │   │   ├── history.ts
│   │   │   ├── index.ts
│   │   │   ├── locate-event.ts
│   │   │   ├── modal-nodes-manager.ts
│   │   │   ├── node-children.ts
│   │   │   ├── node.ts
│   │   │   ├── plugin-context.ts
│   │   │   ├── plugin-instance.ts
│   │   │   ├── preference.ts
│   │   │   ├── prop.ts
│   │   │   ├── props.ts
│   │   │   ├── resource.ts
│   │   │   ├── scroll-target.ts
│   │   │   ├── scroller.ts
│   │   │   ├── selection.ts
│   │   │   ├── sensor.ts
│   │   │   ├── setting-field.ts
│   │   │   ├── setting-prop-entry.ts
│   │   │   ├── setting-target.ts
│   │   │   ├── setting-top-entry.ts
│   │   │   ├── simulator-render.ts
│   │   │   ├── skeleton-item.ts
│   │   │   └── window.ts
│   │   └── type/              # Shell 类型定义
│   │       ├── action-content-object.ts
│   │       ├── active-target.ts
│   │       ├── advanced.ts
│   │       ├── app-config.ts
│   │       ├── assets-json.ts
│   │       ├── block-schema.ts
│   │       ├── command.ts
│   │       ├── component-action.ts
│   │       ├── component-description.ts
│   │       ├── component-instance.ts
│   │       ├── component-metadata.ts
│   │       ├── component-schema.ts
│   │       ├── component-sort.ts
│   │       ├── composite-value.ts
│   │       ├── config-transformer.ts
│   │       ├── configure.ts
│   │       ├── container-schema.ts
│   │       ├── context-menu.ts
│   │       ├── custom-view.ts
│   │       ├── disposable.ts
│   │       ├── dom-text.ts
│   │       ├── drag-any-object.ts
│   │       ├── drag-node-data-object.ts
│   │       ├── drag-node-object.ts
│   │       ├── drag-object.ts
│   │       ├── dynamic-props.ts
│   │       ├── dynamic-setter.ts
│   │       ├── editor-get-options.ts
│   │       ├── editor-get-result.ts
│   │       ├── editor-register-options.ts
│   │       ├── editor-value-key.ts
│   │       ├── editor-view-config.ts
│   │       ├── editor-view.ts
│   │       ├── engine-options.ts
│   │       ├── field-config.ts
│   │       ├── field-extra-props.ts
│   │       ├── hotkey-callback-config.ts
│   │       ├── hotkey-callback.ts
│   │       ├── hotkey-callbacks.ts
│   │       ├── i18n-data.ts
│   │       ├── i18n-map.ts
│   │       ├── icon-config.ts
│   │       ├── icon-type.ts
│   │       ├── index.ts
│   │       ├── location.ts
│   │       ├── metadata-transformer.ts
│   │       ├── metadata.ts
│   │       ├── node-data-type.ts
│   │       ├── node-data.ts
│   │       ├── node-instance.ts
│   │       ├── node-schema.ts
│   │       ├── npm-info.ts
│   │       ├── npm.ts
│   │       ├── on-change-options.ts
│   │       ├── package.ts
│   │       ├── page-schema.ts
│   │       ├── plugin-config.ts
│   │       ├── plugin-creator.ts
│   │       ├── plugin-declaration-property.ts
│   │       ├── plugin-declaration.ts
│   │       ├── plugin-meta.ts
│   │       ├── plugin-register-options.ts
│   │       ├── plugin.ts
│   │       ├── preference-value-type.ts
│   │       ├── prop-change-options.ts
│   │       ├── prop-config.ts
│   │       ├── prop-types.ts
│   │       ├── props-list.ts
│   │       ├── props-map.ts
│   │       ├── props-transformer.ts
│   │       ├── reference.ts
│   │       ├── registered-setters.ts
│   │       ├── remote-component-description.ts
│   │       ├── resource-list.ts
│   │       ├── resource-type-config.ts
│   │       ├── resource-type.ts
│   │       ├── root-schema.ts
│   │       ├── scrollable.ts
│   │       ├── set-value-options.ts
│   │       ├── setter-config.ts
│   │       ├── setter-type.ts
│   │       ├── simulator-renderer.ts
│   │       ├── slot-schema.ts
│   │       ├── snippet.ts
│   │       ├── tip-config.ts
│   │       ├── tip-content.ts
│   │       ├── title-config.ts
│   │       ├── title-content.ts
│   │       ├── transformed-component-metadata.ts
│   │       ├── value-type.ts
│   │       ├── widget-base-config.ts
│   │       ├── widget-config-area.ts
│   │       └── ...
│   ├── shell-model-factory.ts      # Shell 模型工厂
│   ├── utils.ts                  # 工具类型
│   └── deprecated/              # 已弃用的类型
│       ├── index.ts
│       ├── isActionContentObject.ts
│       ├── isCustomView.ts
│       ├── isDOMText.ts
│       ├── isDynamicSetter.ts
│       ├── isI18nData.ts
│       ├── isJSBlock.ts
│       ├── isJSExpression.ts
│       ├── isJSSlot.ts
│       ├── isLowCodeComponentType.ts
│       ├── isNodeSchema.ts
│       ├── isPlainObject.ts
│       ├── isProCodeComponentType.ts
│       ├── isProjectSchema.ts
│       ├── isReactClass.ts
│       ├── isReactComponent.ts
│       ├── isSetterConfig.ts
│       └── isTitleConfig.ts
├── package.json                 # NPM 包配置
├── build.json                  # 构建配置
├── tsconfig.json               # TypeScript 配置
├── .eslintignore               # ESLint 忽略配置
├── .prettierrc.js            # Prettier 配置
└── CHANGELOG.md               # 变更日志
```

## 核心功能模块

### 1. Editor 类型

**文件**: `src/editor.ts`

**功能**: 定义编辑器核心类型，包括：
- 编辑器配置
- 编辑器选项
- 编辑器状态
- 编辑器 API

### 2. Activity 类型

**文件**: `src/activity.ts`

**功能**: 定义活动相关类型，包括：
- 活动类型
- 活动数据
- 活动配置

### 3. Code 中间类型

**文件**: `src/code-intermediate.ts`

**功能**: 定义代码中间表示类型，包括：
- 代码片段
- 代码块
- 代码配置

### 4. Code 结果类型

**文件**: `src/code-result.ts`

**功能**: 定义代码生成结果类型，包括：
- 生成结果
- 生成选项
- 生成配置

### 5. Assets 类型

**文件**: `src/assets.ts`

**功能**: 定义资源相关类型，包括：
- 资源配置
- 资源类型
- 资源包

### 6. Event 类型

**文件**: `src/event/`

**功能**: 定义事件相关类型，包括：
- 节点事件
- 属性事件
- 全局事件

### 7. Shell API 类型

**文件**: `src/shell/api/`

**功能**: 定义 Shell API 类型，包括：
- Canvas API
- Command API
- Common API
- CommonUI API
- Event API
- Hotkey API
- Logger API
- Material API
- Plugins API
- Project API
- Setters API
- SimulatorHost API
- Skeleton API
- Workspace API

### 8. Shell 模型类型

**文件**: `src/shell/model/`

**功能**: 定义 Shell 模型类型，包括：
- 节点模型
- 组件模型
- 文档模型
- 剪贴板模型
- 历史模型
- 选择模型
- 设置模型
- 资源模型
- 窗口模型
- 等等

### 9. Shell 类型定义

**文件**: `src/shell/type/`

**功能**: 定义 Shell 类型定义，包括：
- 组件类型
- 节点类型
- 属性类型
- 配置类型
- 插件类型
- 等等

### 10. Shell 枚举类型

**文件**: `src/shell/enum/`

**功能**: 定义 Shell 枚举类型，包括：
- 上下文菜单枚举
- 拖拽对象类型枚举
- 事件名称枚举
- 插件注册级别枚举
- 属性值改变类型枚举
- 转换阶段枚举
- 过渡类型枚举

### 11. 已弃用类型

**文件**: `src/deprecated/`

**功能**: 定义已弃用的类型，包括：
- 旧版 Schema 类型判断函数
- 旧版组件类型判断函数
- 向后兼容性

## 类型分类

### 1. 核心类型

- Editor 类型
- Activity 类型
- Code 类型
- Assets 类型
- Event 类型

### 2. Shell API 类型

- Canvas API
- Command API
- Common API
- CommonUI API
- Event API
- Hotkey API
- Logger API
- Material API
- Plugins API
- Project API
- Setters API
- SimulatorHost API
- Skeleton API
- Workspace API

### 3. Shell 模型类型

- Node 模型
- Component 模型
- Document 模型
- Clipboard 模型
- History 模型
- Selection 模型
- Setting 模型
- Resource 模型
- Window 模型

### 4. Shell 类型定义

- Component 类型
- Node 类型
- Prop 类型
- Config 类型
- Plugin 类型
- Setter 类型

### 5. 枚举类型

- Context Menu 枚举
- Drag Object Type 枚举
- Event Names 枚举
- Plugin Register Level 枚举
- Prop Value Changed Type 枚举
- Transform Stage 枚举
- Transition Type 枚举

### 6. 已弃用类型

- 旧版 Schema 类型
- 旧版组件类型
- 兼容性函数

## 架构特点

### 1. 模块化设计

- 按功能模块划分
- 清晰的目录结构
- 模块间低耦合

### 2. 类型安全

- 完整的 TypeScript 类型定义
- 严格的类型检查
- 类型推断支持

### 3. 向后兼容

- 保留已弃用的类型
- 平滑的版本升级
- 兼容旧版本 API

### 4. 扩展性

- 插件类型定义
- 自定义类型支持
- 类型扩展机制

### 5. 文档化

- 清晰的类型命名
- 完整的类型注释
- 类型使用示例

## 使用示例

### 导入类型

```typescript
// 导入所有类型
import * as types from '@alilc/lowcode-types';

// 导入特定模块
import { IPublicTypeNodeSchema, IPublicTypeComponentSchema } from '@alilc/lowcode-types';
import { IPublicModelNode, IPublicModelComponentMeta } from '@alilc/lowcode-types';
import { IPublicEnumTransitionType, IPublicEnumTransformStage } from '@alilc/lowcode-types';
```

### 使用类型

```typescript
import { IPublicTypeNodeSchema } from '@alilc/lowcode-types';

const nodeSchema: IPublicTypeNodeSchema = {
  componentName: 'Div',
  props: {
    className: 'container'
  }
};

function processSchema(schema: IPublicTypeNodeSchema) {
  console.log(schema.componentName);
}
```

### 使用枚举

```typescript
import { IPublicEnumTransitionType } from '@alilc/lowcode-types';

const transitionType: IPublicEnumTransitionType = IPublicEnumTransitionType.REPAINT;

if (transitionType === IPublicEnumTransitionType.REPAINT) {
  console.log('Repaint transition');
}
```

## 技术栈

- **TypeScript**: 类型系统
- **React**: UI 框架
- **严格事件发射器类型**: 事件类型

## 模块统计

### 文件分类统计

| 分类 | 文件数 | 说明 |
|------|--------|------|
| 核心类型 | 6 | editor, activity, code-intermediate, code-result, assets, event |
| Shell API 类型 | 13 | canvas, command, common, commonUI, event, hotkey, logger, material, plugins, project, setters, simulator-host, skeleton, workspace |
| Shell 模型类型 | 30 | node, component, document, clipboard, history, selection, setting, resource, window 等 |
| Shell 类型定义 | 100+ | component, node, prop, config, plugin, setter 等 |
| Shell 枚举类型 | 7 | context-menu, drag-object-type, event-names, plugin-register-level, prop-value-changed-type, transform-stage, transition-type |
| 已弃用类型 | 17 | 旧版类型判断函数 |
| 工具类型 | 1 | utils |
| 工厂类型 | 1 | shell-model-factory |

### 代码统计

- **总文件数**: 200+ 个源文件
- **总类型定义**: 500+ 个类型
- **TypeScript 文件**: 200+ 个
- **枚举定义**: 20+ 个
- **接口定义**: 300+ 个

## 相关模块

- [@alilc/lowcode-utils](../utils/README.md) - 工具函数模块
- [@alilc/lowcode-react-renderer](../react-renderer/README.md) - React 渲染器模块
- [@alilc/lowcode-react-simulator-renderer](../react-simulator-renderer/README.md) - React 模拟器渲染器模块
- [@alilc/lowcode-workspace](../workspace/README.md) - 工作区模块

## 版本历史

查看 [CHANGELOG.md](./CHANGELOG.md) 了解详细的版本变更历史。

## 贡献指南

欢迎贡献代码和文档！请参考项目的 [CONTRIBUTOR.md](../../CONTRIBUTOR.md)。

## 许可证

[MIT](../../LICENSE)
