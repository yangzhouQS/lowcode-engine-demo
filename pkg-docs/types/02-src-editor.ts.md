# src/editor.ts - 编辑器核心类型定义

## 文件路径
`packages/types/src/editor.ts`

## 文件概述
定义了低代码编辑器的核心配置类型，包括编辑器配置、插件配置、国际化配置、生命周期配置等。这些类型定义是构建低代码编辑器的基础。

## 功能说明

### 主要职责
1. **编辑器配置**: 定义编辑器的整体配置结构
2. **插件系统**: 定义插件的配置和类型
3. **国际化**: 定义多语言支持的配置
4. **生命周期**: 定义编辑器的生命周期钩子
5. **快捷键**: 定义快捷键配置
6. **工具函数**: 定义工具函数的配置

## 类型定义详解

### 1. EditorConfig
编辑器的主配置接口，包含所有可配置项。

```typescript
export interface EditorConfig {
  skeleton?: SkeletonConfig;      // 骨架屏配置
  theme?: ThemeConfig;            // 主题配置
  plugins?: PluginsConfig;        // 插件配置
  hooks?: HooksConfig;            // 钩子配置
  shortCuts?: ShortCutsConfig;     // 快捷键配置
  utils?: UtilsConfig;            // 工具函数配置
  constants?: ConstantsConfig;    // 常量配置
  lifeCycles?: LifeCyclesConfig;   // 生命周期配置
  i18n?: I18nConfig;              // 国际化配置
}
```

**使用场景**:
- 初始化编辑器时传入的配置对象
- 定义编辑器的整体行为和外观
- 配置插件、主题、国际化等功能

### 2. SkeletonConfig
骨架屏配置，用于定义编辑器的布局结构。

```typescript
export interface SkeletonConfig {
  config: IPublicTypeNpmInfo;              // NPM 包信息
  props?: Record<string, unknown>;         // 骨架屏属性
  handler?: (config: EditorConfig) => EditorConfig;  // 配置处理函数
}
```

**使用场景**:
- 定义编辑器的布局结构
- 配置面板、工具栏等 UI 组件
- 动态调整编辑器布局

### 3. ThemeConfig
主题配置，用于定义编辑器的主题样式。

```typescript
export interface ThemeConfig {
  fusion?: FusionTheme;  // Fusion 主题配置
}

export interface FusionTheme {
  package: string;   // 主题包名
  version: string;   // 主题版本
}
```

**使用场景**:
- 配置编辑器的主题
- 支持 Fusion Design 主题
- 自定义编辑器样式

### 4. PluginsConfig
插件配置，定义插件的注册和配置。

```typescript
export interface PluginsConfig {
  [key: string]: PluginConfig[];  // 按区域分组的插件配置
}
```

**使用场景**:
- 注册多个插件
- 按区域（如工具栏、面板等）组织插件
- 配置插件的显示和行为

### 5. PluginConfig
单个插件的配置接口。

```typescript
export interface PluginConfig {
  pluginKey: string;              // 插件唯一标识
  type: string;                    // 插件类型
  props: {
    icon?: string;                 // 插件图标
    title?: string;                // 插件标题
    width?: number;                // 插件宽度
    height?: number;               // 插件高度
    visible?: boolean;             // 是否可见
    disabled?: boolean;            // 是否禁用
    marked?: boolean;              // 是否标记
    align?: 'left' | 'right' | 'top' | 'bottom';  // 对齐方式
    onClick?: () => void;          // 点击事件
    dialogProps?: Record<string, unknown>;    // 对话框属性
    balloonProps?: Record<string, unknown>;    // 气泡属性
    panelProps?: Record<string, unknown>;      // 面板属性
    linkProps?: Record<string, unknown>;       // 链接属性
  };
  config?: IPublicTypeNpmInfo;     // 插件 NPM 包信息
  pluginProps?: Record<string, unknown>;  // 插件属性
}
```

**使用场景**:
- 配置单个插件的行为
- 定义插件的 UI 属性
- 配置插件的事件和交互

### 6. HooksConfig
钩子配置，定义编辑器的钩子函数。

```typescript
export type HooksConfig = HookConfig[];

export interface HookConfig {
  message: string;  // 钩子消息
  type: 'on' | 'once';  // 钩子类型：持续监听或只执行一次
  handler: (this: IPublicModelEditor, editor: IPublicModelEditor, ...args: any[]) => void;  // 钩子处理函数
}
```

**使用场景**:
- 监听编辑器事件
- 在特定时机执行自定义逻辑
- 扩展编辑器功能

### 7. ShortCutsConfig
快捷键配置，定义编辑器的快捷键。

```typescript
export type ShortCutsConfig = ShortCutConfig[];

export interface ShortCutConfig {
  keyboard: string;  // 快捷键组合，如 'ctrl+s'
  handler: (editor: IPublicModelEditor, ev: Event, keymaster: any) => void;  // 快捷键处理函数
}
```

**使用场景**:
- 配置编辑器的快捷键
- 提高编辑效率
- 自定义快捷键行为

### 8. UtilsConfig
工具函数配置，定义可用的工具函数。

```typescript
export type UtilsConfig = UtilConfig[];

export interface UtilConfig {
  name: string;  // 工具函数名称
  type: 'npm' | 'function';  // 工具函数类型：NPM 包或函数
  content: IPublicTypeNpmInfo | ((...args: []) => any);  // 工具函数内容
}
```

**使用场景**:
- 注册工具函数
- 支持 NPM 包或自定义函数
- 在编辑器中使用工具函数

### 9. ConstantsConfig
常量配置，定义编辑器的常量。

```typescript
export type ConstantsConfig = Record<string, unknown>;
```

**使用场景**:
- 定义全局常量
- 配置编辑器的固定值
- 在整个编辑器中使用

### 10. LifeCyclesConfig
生命周期配置，定义编辑器的生命周期钩子。

```typescript
export interface LifeCyclesConfig {
  init?: (editor: IPublicModelEditor) => any;      // 初始化钩子
  destroy?: (editor: IPublicModelEditor) => any;    // 销毁钩子
}
```

**使用场景**:
- 在编辑器初始化时执行逻辑
- 在编辑器销毁时清理资源
- 管理编辑器的生命周期

### 11. I18nConfig
国际化配置，定义多语言支持。

```typescript
export type LocaleType = 'zh-CN' | 'zh-TW' | 'en-US' | 'ja-JP';

export interface I18nMessages {
  [key: string]: string;  // 国际化消息键值对
}

export interface I18nConfig {
  'zh-CN'?: I18nMessages;  // 简体中文
  'zh-TW'?: I18nMessages;  // 繁体中文
  'en-US'?: I18nMessages;  // 英文
  'ja-JP'?: I18nMessages;  // 日文
}

export type I18nFunction = (key: string, params: any) => string;  // 国际化函数类型
```

**使用场景**:
- 配置多语言支持
- 定义不同语言的文本
- 在编辑器中使用国际化

### 12. Utils
工具函数集合类型。

```typescript
export interface Utils {
  [key: string]: (...args: any[]) => any;  // 工具函数集合
}
```

**使用场景**:
- 存储工具函数
- 在编辑器中调用工具函数
- 扩展编辑器功能

### 13. PluginProps
插件属性类型。

```typescript
export interface PluginProps {
  editor?: IPublicModelEditor;  // 编辑器实例
  config: PluginConfig;          // 插件配置
  [key: string]: any;           // 其他属性
}
```

**使用场景**:
- 传递给插件的属性
- 插件可以访问编辑器实例
- 插件可以接收自定义属性

### 14. Plugin
插件类型，支持 React 节点。

```typescript
export type Plugin = ReactNode & {
  open?: () => boolean | undefined | Promise<any>;   // 打开插件
  close?: () => boolean | undefined | Promise<any>;  // 关闭插件
};
```

**使用场景**:
- 定义插件组件
- 支持插件的打开和关闭
- 支持异步操作

### 15. HOCPlugin
高阶插件类型，必须实现 open 和 close 方法。

```typescript
export type HOCPlugin = ReactNode & {
  open: () => Promise<any>;   // 打开插件（异步）
  close: () => Promise<any>;  // 关闭插件（异步）
};
```

**使用场景**:
- 定义高阶插件
- 支持异步操作
- 必须实现打开和关闭方法

### 16. PluginSet
插件集合类型。

```typescript
export interface PluginSet {
  [key: string]: HOCPlugin;  // 插件集合
}
```

**使用场景**:
- 存储多个插件
- 按名称索引插件
- 管理插件集合

### 17. PluginClass
插件类类型，支持 React 组件。

```typescript
export type PluginClass = ComponentType<PluginProps> & {
  init?: (editor: IPublicModelEditor) => void;  // 初始化方法
  defaultProps?: {
    locale?: LocaleType;        // 默认语言
    messages?: I18nMessages;    // 默认国际化消息
  };
};
```

**使用场景**:
- 定义插件类组件
- 支持插件初始化
- 支持默认属性

### 18. PluginClassSet
插件类集合类型。

```typescript
export interface PluginClassSet {
  [key: string]: PluginClass;  // 插件类集合
}
```

**使用场景**:
- 存储多个插件类
- 按名称索引插件类
- 管理插件类集合

### 19. PluginStatus
插件状态类型。

```typescript
export interface PluginStatus {
  disabled?: boolean;  // 是否禁用
  visible?: boolean;   // 是否可见
  marked?: boolean;    // 是否标记
  locked?: boolean;    // 是否锁定
}
```

**使用场景**:
- 定义插件的状态
- 控制插件的显示和交互
- 管理插件的状态

### 20. PluginStatusSet
插件状态集合类型。

```typescript
export interface PluginStatusSet {
  [key: string]: PluginStatus;  // 插件状态集合
}
```

**使用场景**:
- 存储多个插件的状态
- 按名称索引插件状态
- 管理插件状态集合

## 使用示例

### 基本编辑器配置
```typescript
import { EditorConfig } from '@alilc/lowcode-types';

const config: EditorConfig = {
  theme: {
    fusion: {
      package: '@alifd/theme-design-pro',
      version: '0.8.0'
    }
  },
  i18n: {
    'zh-CN': {
      'editor.title': '低代码编辑器'
    },
    'en-US': {
      'editor.title': 'Low Code Editor'
    }
  },
  lifeCycles: {
    init: (editor) => {
      console.log('Editor initialized');
    },
    destroy: (editor) => {
      console.log('Editor destroyed');
    }
  }
};
```

### 插件配置
```typescript
import { PluginConfig, PluginsConfig } from '@alilc/lowcode-types';

const plugins: PluginsConfig = {
  'toolbar': [
    {
      pluginKey: 'save',
      type: 'button',
      props: {
        icon: 'save',
        title: '保存',
        onClick: () => {
          console.log('Save clicked');
        }
      }
    }
  ]
};
```

### 快捷键配置
```typescript
import { ShortCutsConfig } from '@alilc/lowcode-types';

const shortCuts: ShortCutsConfig = [
  {
    keyboard: 'ctrl+s',
    handler: (editor, ev, keymaster) => {
      ev.preventDefault();
      console.log('Save shortcut triggered');
    }
  }
];
```

### 工具函数配置
```typescript
import { UtilsConfig } from '@alilc/lowcode-types';

const utils: UtilsConfig = [
  {
    name: 'formatDate',
    type: 'function',
    content: (date: Date) => {
      return date.toISOString();
    }
  }
];
```

## 设计特点

### 1. 配置化设计
- 所有功能通过配置定义
- 灵活扩展编辑器功能
- 易于维护和升级

### 2. 插件化架构
- 支持插件系统
- 插件可独立开发和维护
- 插件可按需加载

### 3. 国际化支持
- 内置多语言支持
- 支持动态切换语言
- 易于添加新语言

### 4. 生命周期管理
- 完整的生命周期钩子
- 支持初始化和销毁
- 便于资源管理

### 5. 类型安全
- 完整的 TypeScript 类型定义
- 严格的类型检查
- 提供智能提示

## 注意事项

1. **插件配置**: 插件配置按区域分组，需要确保区域名称正确
2. **国际化**: 国际化消息键需要在所有语言中定义
3. **生命周期**: 生命周期钩子是可选的，根据需要配置
4. **快捷键**: 快捷键组合使用 keymaster 语法，需要注意浏览器兼容性
5. **工具函数**: 工具函数可以是 NPM 包或自定义函数，需要确保类型正确

## 相关文件

- [`index.ts`](./01-src-index.ts) - 模块入口
- [`shell/model/editor.ts`](./shell/model/editor.ts) - Editor 模型类型
- [`shell/api/plugins.ts`](./shell/api/plugins.ts) - Plugins API 类型

## 版本历史

- **v1.3.2**: 当前版本，包含所有编辑器核心类型定义
