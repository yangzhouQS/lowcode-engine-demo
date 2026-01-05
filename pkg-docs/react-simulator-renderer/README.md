# React Simulator Renderer 模块文档

## 概述

`@alilc/lowcode-react-simulator-renderer` 是低代码引擎的模拟器渲染器模块，负责在设计器中模拟和渲染低代码组件。它是连接低代码设计器和实际运行时环境的桥梁，提供实时的预览和交互能力。

## 文档目录

### 核心文档

1. [01-架构设计.md](01-架构设计.md) - 模块的整体架构设计，包括核心类、设计模式、数据流等
2. [02-API设计.md](02-API设计.md) - 完整的 API 参考文档，包括所有公共接口和类型定义
3. [03-文件功能说明.md](03-文件功能说明.md) - 所有文件的功能说明和目录结构

### 配置文件文档

4. [04-package.json.md](04-package.json.md) - NPM 包配置文件详解

### 源代码文档

#### 入口文件

5. [05-src-index.ts.md](05-src-index.ts.md) - 模块入口文件，导出渲染器实例

#### 核心实现

6. [06-src-renderer.ts.md](06-src-renderer.ts.md) - 核心渲染器实现，包含所有主要逻辑

#### 视图组件

7. [07-src-renderer-view.tsx.md](07-src-renderer-view.tsx.md) - React 视图组件，提供渲染器的 UI 层

#### 内置组件

8. [08-src-builtin-components-builtin-components.ts.md](08-src-builtin-components-builtin-components.ts.md) - 内置 HTML 元素的 mock 组件
9. [09-src-builtin-components-leaf.tsx.md](09-src-builtin-components-leaf.tsx.md) - 叶子组件
10. [10-src-builtin-components-slot.tsx.md](10-src-builtin-components-slot.tsx.md) - 插槽组件

#### 国际化

11. [11-src-locale-index.ts.md](11-src-locale-index.ts.md) - 国际化工具函数
12. [12-src-locale-en-US.json.md](12-src-locale-en-US.json.md) - 英文语言包
13. [13-src-locale-zh-CN.json.md](13-src-locale-zh-CN.json.md) - 中文语言包

#### 工具函数

14. [14-src-utils-get-client-rects.ts.md](14-src-utils-get-client-rects.ts.md) - 获取元素矩形区域
15. [15-src-utils-is-dom-node.ts.md](15-src-utils-is-dom-node.ts.md) - DOM 节点判断
16. [16-src-utils-misc.ts.md](16-src-utils-misc.ts.md) - 杂项工具函数
17. [17-src-utils-react-find-dom-nodes.ts.md](17-src-utils-react-find-dom-nodes.ts.md) - React DOM 查找
18. [18-src-utils-url.ts.md](18-src-utils-url.ts.md) - URL 处理工具

#### 其他源文件

19. [19-src-host.ts.md](19-src-host.ts.md) - 主机引用（仅类型标注）
20. [20-src-renderer.less.md](20-src-renderer.less.md) - 渲染器样式文件

### 配置文件文档

21. [21-tsconfig.json.md](21-tsconfig.json.md) - TypeScript 编译配置
22. [22-babel.config.js.md](22-babel.config.js.md) - Babel 转译配置
23. [23-build.json.md](23-build.json.md) - 构建脚本配置
24. [24-jest.config.js.md](24-jest.config.js.md) - Jest 测试框架配置

### 测试文件文档

25. [25-test-schema-basic.ts.md](25-test-schema-basic.ts.md) - 基础测试 schema
26. [26-test-src-renderer-demo.test.tsx.md](26-test-src-renderer-demo.test.tsx.md) - Demo 测试用例
27. [27-test-utils-components.tsx.md](27-test-utils-components.tsx.md) - 测试用的组件
28. [28-test-utils-host.ts.md](28-test-utils-host.ts.md) - 测试用的主机 mock

## 快速开始

### 安装

```bash
npm install @alilc/lowcode-react-simulator-renderer
```

### 基本使用

```typescript
import renderer from '@alilc/lowcode-react-simulator-renderer';

// 启动渲染器
renderer.run();

// 刷新渲染器
renderer.rerender();

// 销毁渲染器
renderer.dispose();
```

### 加载组件库

```typescript
await renderer.load({
  type: 'npm',
  package: '@alifd/next',
  version: '1.23.0',
});
```

### 获取组件

```typescript
const Button = renderer.getComponent('Button');
const FormItem = renderer.getComponent('Form.Item');
```

### 查找节点实例

```typescript
const instance = renderer.getClosestNodeInstance(domElement);
const domNodes = renderer.findDOMNodes(instance);
```

## 核心概念

### 1. SimulatorRendererContainer

渲染器容器，管理整个模拟器的渲染逻辑。它是单例，全局唯一。

**主要职责**:
- 管理文档实例
- 同步主机状态
- 提供组件创建和查询
- 处理路由和导航

### 2. DocumentInstance

文档实例，管理单个文档的渲染状态。

**主要职责**:
- 维护组件实例映射表
- 处理组件的挂载和卸载
- 提供节点查询功能

### 3. SimulatorRendererView

React 视图组件，提供渲染器的 UI 层。

**主要职责**:
- 渲染文档列表
- 处理路由切换
- 提供布局支持

### 4. 内置组件

模块提供了一些内置组件：

- **Slot**: 插槽组件，用于占位和内容分发
- **Leaf**: 叶子组件，用于渲染叶子节点
- **HTML 元素**: 内置 HTML 元素的 mock 组件

## 架构特点

### 1. 响应式架构

基于 MobX 的精确响应式，性能优异。

```typescript
@obx.ref private _components: any = {};

@computed get components(): object {
  return this._components;
}
```

### 2. 单例模式

渲染器容器是单例，全局唯一。

```typescript
export default new SimulatorRendererContainer();
```

### 3. 工厂模式

组件创建使用工厂模式。

```typescript
createComponent(schema: IPublicTypeComponentSchema): Component | null {
  // 根据 schema 创建组件
}
```

### 4. 观察者模式

使用 MobX 的观察者模式实现响应式更新。

```typescript
@observer
export class Renderer extends Component {
  render() {
    // 自动订阅 observable 状态变化
  }
}
```

## 主要功能

### 1. 组件渲染

在模拟器环境中渲染低代码组件和页面。

### 2. 实例管理

管理组件实例的生命周期和状态。

### 3. 路由模拟

提供内存路由，支持多页面应用模拟。

### 4. 国际化支持

提供多语言切换能力。

### 5. 设备适配

支持不同设备的响应式渲染。

### 6. 事件处理

处理组件的交互事件。

### 7. DOM 操作

提供 DOM 节点查询和操作能力。

## 技术栈

- **React 16**: 基于 React 16 进行组件渲染
- **MobX**: 使用 MobX 进行状态管理和响应式更新
- **React Router**: 使用内存路由进行页面导航模拟
- **TypeScript**: 使用 TypeScript 提供类型安全
- **history**: 使用 history 库管理路由

## 性能优化

### 1. 响应式优化

使用 MobX 的精确响应式，只在依赖变化时重新计算。

### 2. 实例缓存

使用 Map 缓存组件实例，快速查找。

### 3. 条件渲染

根据状态决定是否渲染，避免不必要的渲染。

### 4. 批量更新

使用 MobX 的 action 批量更新，减少通知次数。

## 扩展性

### 1. 插件机制

通过 Host 注入自定义逻辑。

### 2. 组件扩展

支持自定义组件和内置组件。

### 3. 主题扩展

通过 CSS 类名控制样式。

## 测试

### 运行测试

```bash
npm test
```

### 生成覆盖率报告

```bash
npm run test:cov
```

### 测试文件

- `test/src/renderer/demo.test.tsx` - Demo 测试
- `test/schema/basic.ts` - 测试 schema
- `test/utils/components.tsx` - 测试组件
- `test/utils/host.ts` - 测试主机 mock

## 常见问题

### 1. 如何调试渲染器？

在浏览器控制台中使用全局对象：

```javascript
console.log(window.SimulatorRenderer);
```

### 2. 如何强制刷新渲染器？

```typescript
renderer.rerender();
```

### 3. 如何禁用自动渲染？

```typescript
renderer.autoRender = false;
```

### 4. 如何查找组件实例？

```typescript
const instance = renderer.getClosestNodeInstance(domElement);
```

## 相关资源

- [低代码引擎官方文档](https://lowcode-engine.cn/)
- [GitHub 仓库](https://github.com/alibaba/lowcode-engine)
- [NPM 包](https://www.npmjs.com/package/@alilc/lowcode-react-simulator-renderer)

## 贡献

欢迎贡献代码、报告问题或提出建议。请查看 [CONTRIBUTING.md](https://github.com/alibaba/lowcode-engine/blob/main/CONTRIBUTOR.md) 了解详情。

## 许可证

MIT License

## 联系方式

- 问题反馈: [GitHub Issues](https://github.com/alibaba/lowcode-engine/issues)
- 邮件: lowcode@service.alibaba.com

---

**文档版本**: 1.0.0  
**最后更新**: 2026-01-05
