# Vue3 低代码引擎 - 示例应用

这是一个基于 Vue3 低代码引擎的示例应用，展示了如何使用 Vue3 LowCode Engine 构建低代码平台。

## 项目概述

本示例应用完整集成了 Vue3 低代码引擎的所有核心功能，包括：

- 基于 Vue3 Composition API 的组件开发
- 集成 Element Plus UI 组件库
- 使用 Vite 5 作为构建工具
- 完整的 TypeScript 类型支持
- **完整的 Shell API 集成**
- **实时引擎状态监控**
- **事件系统**
- **插件系统架构**
- **可扩展的设计器**
- **灵活的渲染器**
- **完整的工作区管理**
- 响应式设计和现代化 UI

## 技术栈

- **框架**: Vue 3.4+
- **UI 库**: Element Plus 2.4+
- **构建工具**: Vite 5.0+
- **语言**: TypeScript 5.3+
- **包管理**: pnpm
- **低代码引擎**: @vue3-lowcode/*

## 快速开始

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
cd vue3-packages
pnpm install
```

### 构建所有包

```bash
pnpm build
```

### 启动开发服务器

```bash
cd apps/example-app
pnpm dev
```

访问 http://localhost:3000 查看应用。

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 项目结构

```
example-app/
├── src/
│   ├── App.vue          # 主应用组件（展示引擎状态）
│   └── main.ts          # 应用入口（初始化 Shell）
├── index.html            # HTML 模板
├── package.json          # 项目配置
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 配置
└── README.md            # 项目文档
```

## 核心特性

### 1. Vue3 Composition API

使用 Vue3 的 Composition API 构建组件，提供更好的代码组织和类型推断。

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue';

const count = ref(0);
const form = reactive({
  name: '',
  email: ''
});
</script>
```

### 2. Element Plus 集成

集成 Element Plus 组件库，提供丰富的 UI 组件。

```vue
<template>
  <el-button type="primary" @click="handleClick">
    点击我
  </el-button>
</template>
```

### 3. TypeScript 支持

完整的 TypeScript 类型支持，提供更好的开发体验和代码质量。

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id:1,
  name: 'John Doe',
  email: 'john@example.com'
};
```

### 4. Shell API 集成

本示例应用已完整集成 Vue3 低代码引擎的 Shell API，在应用启动时会自动初始化引擎。

**初始化代码（在 `src/main.ts` 中）：**

```typescript
import { Shell } from '@vue3-lowcode/shell';

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

// 初始化并启动
await shell.init();
await shell.start();

// 将 shell 挂载到 window 对象，方便调试
(window as any).__LOWCODE_SHELL__ = shell;
```

**访问引擎模块：**

```typescript
// 获取编辑器
const editor = shell.getEditor();

// 获取设计器
const designer = shell.getDesigner();

// 获取文档模型
const documentModel = shell.getDocumentModel();

// 获取事件总线
const eventBus = shell.getEventBus();

// 获取命令系统
const command = shell.getCommand();
```

**监听引擎事件：**

```typescript
const eventBus = shell.getEventBus();

eventBus.on('shell:init', () => {
  console.log('Shell initialized');
});

eventBus.on('shell:start', () => {
  console.log('Shell started');
});
```

**导出和导入状态：**

```typescript
// 导出当前状态
const state = shell.export();
console.log('Current state:', state);

// 导入状态
await shell.import(savedState);
```

**调试引擎：**

在浏览器控制台中，您可以通过 `window.__LOWCODE_SHELL__` 访问 Shell 实例：

```javascript
// 查看引擎状态
console.log(window.__LOWCODE_SHELL__.export());

// 获取编辑器
console.log(window.__LOWCODE_SHELL__.getEditor());

// 获取设计器
console.log(window.__LOWCODE_SHELL__.getDesigner());
```

### 5. 响应式设计

使用 CSS Grid 和 Flexbox 实现响应式布局。

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
```

## 使用指南

### 基础组件使用

#### 按钮

```vue
<el-button type="primary">主要按钮</el-button>
<el-button type="success">成功按钮</el-button>
<el-button type="warning">警告按钮</el-button>
<el-button type="danger">危险按钮</el-button>
```

#### 表单

```vue
<el-form :model="form" label-width="100px">
  <el-form-item label="用户名">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="form.password" type="password"></el-input>
  </el-form-item>
</el-form>
```

#### 对话框

```vue
<el-dialog v-model="visible" title="提示">
  <p>这是一个对话框内容</p>
  <template #footer>
    <el-button @click="visible = false">取消</el-button>
    <el-button type="primary" @click="handleConfirm">确定</el-button>
  </template>
</el-dialog>
```

### 高级功能

#### 1. 插件系统

Vue3 低代码引擎提供了强大的插件系统，支持扩展编辑器功能。

```typescript
import { VuePlugin } from '@vue3-lowcode/plugin';

class MyPlugin extends VuePlugin {
  async onStart() {
    console.log('插件启动');
  }
  
  async onStop() {
    console.log('插件停止');
  }
}

export default new MyPlugin({
  name: 'my-plugin',
  version: '1.0.0'
});
```

#### 2. 设计器集成

集成设计器实现可视化拖拽编辑。

```typescript
import { Designer } from '@vue3-lowcode/designer';

const designer = new Designer({
  // 配置选项
});
```

#### 3. 渲染器使用

使用渲染器实时预览页面效果。

```typescript
import { VueRenderer } from '@vue3-lowcode/vue-renderer';

const renderer = new VueRenderer({
  // 配置选项
});
```

## 开发指南

### 添加新组件

1. 在 `src/components` 目录下创建新组件
2. 在 `App.vue` 中导入并使用组件

```vue
<template>
  <div>
    <MyComponent />
  </div>
</template>

<script setup lang="ts">
import MyComponent from './components/MyComponent.vue';
</script>
```

### 样式开发

使用 scoped CSS 确保样式隔离。

```vue
<style scoped>
.my-component {
  color: #333;
}
</style>
```

### 状态管理

使用 Vue3 的响应式 API 管理组件状态。

```typescript
import { ref, computed } from 'vue';

const count = ref(0);
const doubleCount = computed(() => count.value * 2);

function increment() {
  count.value++;
}
```

## 部署

### 构建生产版本

```bash
pnpm build
```

构建产物将输出到 `dist` 目录。

### 部署到静态服务器

将 `dist` 目录部署到任何静态文件服务器，如：

- Nginx
- Apache
- Vercel
- Netlify
- GitHub Pages

## 性能优化

### 代码分割

使用动态导入实现代码分割。

```typescript
const Component = defineAsyncComponent(() => import('./Component.vue'));
```

### 懒加载

使用路由懒加载优化首屏加载。

```typescript
const routes = [
  {
    path: '/about',
    component: () => import('./views/About.vue')
  }
];
```

### 资源优化

- 压缩图片
- 使用 CDN 加速资源
- 启用 Gzip 压缩

## 常见问题

### Q: 如何自定义主题？

A: Element Plus 支持主题定制，可以通过 CSS 变量或 SCSS 变量自定义主题。

### Q: 如何添加新的 UI 组件？

A: 可以在 `src/components` 目录下创建新组件，然后在需要的地方导入使用。

### Q: 如何集成其他第三方库？

A: 通过 `pnpm add` 安装依赖，然后在组件中导入使用。

### Q: 如何调试低代码引擎？

A: 在开发模式下，Shell 会输出详细的日志信息，可以在浏览器控制台查看。也可以通过 `window.__LOWCODE_SHELL__` 访问引擎实例：

```javascript
// 查看引擎状态
console.log(window.__LOWCODE_SHELL__.export());

// 获取编辑器
console.log(window.__LOWCODE_SHELL__.getEditor());

// 获取设计器
console.log(window.__LOWCODE_SHELL__.getDesigner());

// 获取文档模型
console.log(window.__LOWCODE_SHELL__.getDocumentModel());
```

### Q: 引擎初始化失败怎么办？

A: 请检查以下几点：
1. 确保所有依赖包都已正确构建（在 `vue3-packages` 目录下运行 `pnpm build`）
2. 检查浏览器控制台的错误信息
3. 确认 Node.js 版本 >= 18.0.0
4. 确认 pnpm 版本 >= 8.0.0
5. 检查 `@vue3-lowcode/*` 包是否正确安装

### Q: 如何切换语言？

A: 在 `src/main.ts` 中修改 Shell 的 locale 配置：

```typescript
const shell = new Shell({
  locale: 'en-US', // 切换为英文
  // ... 其他配置
});
```

### Q: 如何导出和导入引擎状态？

A: 使用 Shell 的 export 和 import 方法：

```typescript
// 导出当前状态
const state = shell.export();
console.log('Current state:', state);

// 保存到 localStorage
localStorage.setItem('lowcode-state', JSON.stringify(state));

// 从 localStorage 导入
const savedState = JSON.parse(localStorage.getItem('lowcode-state') || '{}');
await shell.import(savedState);
```

## 贡献指南

欢迎贡献代码、报告问题或提出改进建议。

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License

## 联系方式

- 项目地址: https://github.com/vue3-lowcode/engine
- 问题反馈: https://github.com/vue3-lowcode/engine/issues
- 邮箱: support@vue3-lowcode.com

## 相关资源

- [Vue3 官方文档](https://vuejs.org/)
- [Element Plus 官方文档](https://element-plus.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vue3 低代码引擎架构文档](../../docs/architecture.md)
- [Vue3 低代码引擎 API 文档](../../docs/api.md)

## 致谢

感谢所有贡献者和使用者的支持！
