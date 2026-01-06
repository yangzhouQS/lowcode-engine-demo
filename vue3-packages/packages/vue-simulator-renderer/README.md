# @vue3-lowcode/vue-simulator-renderer

## 简介

`@vue3-lowcode/vue-simulator-renderer` 是 Vue3 LowCode 框架的模拟器渲染器实现，基于 `@vue3-lowcode/vue-renderer` 提供了模拟器模式和设备支持。

## 功能特性

- 提供 Vue3 模拟器渲染器实现 `SimulatorRenderer`
- 支持模拟器模式切换
- 支持设备类型切换（desktop、mobile、tablet）
- 继承 VueRenderer 的所有功能
- 完整的类型支持

## 安装

```bash
pnpm add @vue3-lowcode/vue-simulator-renderer
```

## 使用

### SimulatorRenderer

Vue3 模拟器渲染器实现，用于在模拟器模式下渲染组件。

```typescript
import { SimulatorRenderer } from '@vue3-lowcode/vue-simulator-renderer';

const renderer = new SimulatorRenderer();
renderer.init();
renderer.start();

// 启用模拟器模式
renderer.enableSimulatorMode();

// 设置设备
renderer.setDevice('mobile');

// 渲染组件
renderer.render({
  node: node,
  schema: schema,
});
```

## API 文档

### SimulatorRenderer

`SimulatorRenderer` 继承自 `VueRenderer`，提供了以下方法：

| 方法 | 描述 |
|------|------|
| `enableSimulatorMode()` | 启用模拟器模式 |
| `disableSimulatorMode()` | 禁用模拟器模式 |
| `isSimulatorMode()` | 检查是否启用了模拟器模式 |
| `setDevice(device)` | 设置设备类型 |
| `getDevice()` | 获取设备类型 |
| `render(props)` | 渲染组件 |
| `dispose()` | 销毁渲染器 |

### 设备类型

| 设备类型 | 描述 |
|----------|------|
| `desktop` | 桌面设备 |
| `mobile` | 移动设备 |
| `tablet` | 平板设备 |

## 使用示例

### 基本使用

```typescript
import { SimulatorRenderer } from '@vue3-lowcode/vue-simulator-renderer';

// 创建模拟器渲染器
const renderer = new SimulatorRenderer();
renderer.init();
renderer.start();

// 设置容器
const container = document.getElementById('app');
renderer.setContainer(container);

// 启用模拟器模式
renderer.enableSimulatorMode();

// 设置设备
renderer.setDevice('mobile');

// 渲染组件
renderer.render({
  node: node,
  schema: schema,
});
```

### 模拟器模式切换

```typescript
import { SimulatorRenderer } from '@vue3-lowcode/vue-simulator-renderer';

const renderer = new SimulatorRenderer();
renderer.init();

// 启用模拟器模式
renderer.enableSimulatorMode();
console.log(renderer.isSimulatorMode()); // true

// 禁用模拟器模式
renderer.disableSimulatorMode();
console.log(renderer.isSimulatorMode()); // false
```

### 设备切换

```typescript
import { SimulatorRenderer } from '@vue3-lowcode/vue-simulator-renderer';

const renderer = new SimulatorRenderer();
renderer.init();

// 切换到桌面设备
renderer.setDevice('desktop');
console.log(renderer.getDevice()); // 'desktop'

// 切换到移动设备
renderer.setDevice('mobile');
console.log(renderer.getDevice()); // 'mobile'

// 切换到平板设备
renderer.setDevice('tablet');
console.log(renderer.getDevice()); // 'tablet'
```

### 事件监听

```typescript
import { SimulatorRenderer } from '@vue3-lowcode/vue-simulator-renderer';

const renderer = new SimulatorRenderer();
renderer.init();

// 监听模拟器模式启用事件
renderer.on('simulatorModeEnabled', () => {
  console.log('Simulator mode enabled');
});

// 监听模拟器模式禁用事件
renderer.on('simulatorModeDisabled', () => {
  console.log('Simulator mode disabled');
});

// 监听设备变化事件
renderer.on('deviceChanged', (device) => {
  console.log('Device changed to:', device);
});

// 监听模拟器渲染事件
renderer.on('simulatorRendered', (props) => {
  console.log('Simulator rendered:', props);
});
```

## 事件

### SimulatorRenderer 事件

| 事件名 | 描述 |
|--------|------|
| `simulatorModeEnabled` | 模拟器模式启用 |
| `simulatorModeDisabled` | 模拟器模式禁用 |
| `deviceChanged` | 设备变化 |
| `simulatorRendered` | 模拟器渲染完成 |

### 继承的事件

SimulatorRenderer 继承自 VueRenderer，因此也支持以下事件：

| 事件名 | 描述 |
|--------|------|
| `init` | 初始化完成 |
| `start` | 启动完成 |
| `stop` | 停止完成 |
| `dispose` | 销毁完成 |
| `render` | 渲染完成 |
| `change` | 状态变化 |

## 完整示例

```typescript
import { SimulatorRenderer } from '@vue3-lowcode/vue-simulator-renderer';

class SimulatorApp {
  private renderer: SimulatorRenderer;

  constructor() {
    this.renderer = new SimulatorRenderer();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // 监听模拟器模式启用事件
    this.renderer.on('simulatorModeEnabled', () => {
      console.log('Simulator mode enabled');
    });

    // 监听模拟器模式禁用事件
    this.renderer.on('simulatorModeDisabled', () => {
      console.log('Simulator mode disabled');
    });

    // 监听设备变化事件
    this.renderer.on('deviceChanged', (device) => {
      console.log('Device changed to:', device);
    });

    // 监听模拟器渲染事件
    this.renderer.on('simulatorRendered', (props) => {
      console.log('Simulator rendered:', props);
    });
  }

  async init() {
    // 初始化渲染器
    this.renderer.init();
    this.renderer.start();

    // 设置容器
    const container = document.getElementById('app');
    if (container) {
      this.renderer.setContainer(container);
    }

    // 启用模拟器模式
    this.renderer.enableSimulatorMode();

    // 设置设备
    this.renderer.setDevice('desktop');

    // 渲染组件
    await this.renderComponent();
  }

  private async renderComponent() {
    // 获取节点和 schema
    const node = this.getNode();
    const schema = this.getSchema();

    // 渲染组件
    this.renderer.render({
      node,
      schema,
    });
  }

  private getNode() {
    // 获取节点逻辑
    return null;
  }

  private getSchema() {
    // 获取 schema 逻辑
    return null;
  }

  public setDevice(device: 'desktop' | 'mobile' | 'tablet') {
    this.renderer.setDevice(device);
  }

  public getDevice() {
    return this.renderer.getDevice();
  }

  public enableSimulatorMode() {
    this.renderer.enableSimulatorMode();
  }

  public disableSimulatorMode() {
    this.renderer.disableSimulatorMode();
  }

  public isSimulatorMode() {
    return this.renderer.isSimulatorMode();
  }

  public dispose() {
    this.renderer.dispose();
  }
}

// 使用示例
const app = new SimulatorApp();
app.init();
```

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

## 许可证

MIT
