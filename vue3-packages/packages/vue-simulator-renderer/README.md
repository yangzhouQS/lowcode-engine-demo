# @vue3-lowcode/vue-simulator-renderer

Vue3 低代码引擎 Vue 模拟器渲染器实现，支持设备模拟、缩放等功能。

## 概述

`@vue3-lowcode/vue-simulator-renderer` 是 Vue3 低代码引擎的模拟器渲染器实现，提供了：

- **SimulatorRenderer 类**: 模拟器渲染器实现
- **设备模拟**: 支持多种设备预设
- **缩放功能**: 支持自定义缩放比例
- **样式自定义**: 支持自定义样式和类名
- **完整的 TypeScript 支持**: 提供完整的类型定义

## 安装

```bash
pnpm add @vue3-lowcode/vue-simulator-renderer
```

## 使用

### SimulatorRenderer 类

`SimulatorRenderer` 继承自 `VueRenderer`，提供模拟器特定的渲染功能：

```typescript
import { SimulatorRenderer, PRESET_DEVICES } from '@vue3-lowcode/vue-simulator-renderer';

const simulator = new SimulatorRenderer({
  container: document.getElementById('simulator'),
  device: PRESET_DEVICES[0],
  debug: true,
});

// 初始化模拟器
simulator.init();

// 渲染组件
simulator.render(MyComponent, schema);

// 设置设备
simulator.setDevice(PRESET_DEVICES[1]);

// 设置缩放
simulator.setScale(2);

// 销毁模拟器
simulator.destroy();
```

## API

### SimulatorRenderer 类

| 方法 | 描述 |
|------|------|
| `init()` | 初始化模拟器 |
| `render(component, schema?, context?)` | 渲染组件到模拟器 |
| `setContainer(container)` | 设置容器 |
| `setDevice(device)` | 设置设备 |
| `setScale(scale)` | 设置缩放 |
| `setWidth(width)` | 设置宽度 |
| `setHeight(height)` | 设置高度 |
| `setSize(width, height)` | 设置大小 |
| `setStyles(styles)` | 设置样式 |
| `setClassName(className)` | 设置类名 |
| `getDevice()` | 获取当前设备 |
| `getScale()` | 获取当前缩放 |
| `getWidth()` | 获取当前宽度 |
| `getHeight()` | 获取当前高度 |
| `getConfig()` | 获取配置 |
| `setConfig(config)` | 设置配置 |
| `reset()` | 重置模拟器 |
| `getDeviceInfo()` | 获取设备信息 |
| `isInitialized()` | 检查是否已初始化 |
| `isDestroyed()` | 检查是否已销毁 |

### 静态方法

| 方法 | 描述 |
|------|------|
| `getPresetDevices()` | 获取预设设备列表 |
| `addPresetDevice(device)` | 添加自定义设备 |
| `removePresetDevice(name)` | 移除预设设备 |
| `clearPresetDevices()` | 清空预设设备 |

## 类型

### SimulatorConfig

模拟器配置接口：

```typescript
interface SimulatorConfig {
  container?: Element;
  debug?: boolean;
  performance?: boolean;
  errorBoundary?: boolean;
  errorHandler?: (error: Error) => void;
  warningHandler?: (warning: string) => void;
  width?: number;
  height?: number;
  scale?: number;
  device?: SimulatorDevice;
  styles?: Record<string, string>;
  className?: string;
}
```

### SimulatorDevice

模拟器设备接口：

```typescript
interface SimulatorDevice {
  name: string;
  width: number;
  height: number;
  scale?: number;
  description?: string;
}
```

## 预设设备

内置了多种预设设备：

| 设备名称 | 宽度 | 高度 | 缩放 | 描述 |
|----------|------|------|------|------|
| iPhone 12 Pro | 390 | 844 | 3x | iPhone 12 Pro - 390x844 @3x |
| iPhone 12 | 390 | 844 | 2x | iPhone 12 - 390x844 @2x |
| iPhone SE | 375 | 667 | 2x | iPhone SE - 375x667 @2x |
| iPad Pro | 1024 | 1366 | 2x | iPad Pro - 1024x1366 @2x |
| Desktop | 1920 | 1080 | 1x | Desktop - 1920x1080 @1x |

## 示例

### 基本使用

```typescript
import { SimulatorRenderer, PRESET_DEVICES } from '@vue3-lowcode/vue-simulator-renderer';

// 创建模拟器
const simulator = new SimulatorRenderer({
  container: document.getElementById('simulator'),
  device: PRESET_DEVICES[0],
  debug: true,
});

// 初始化模拟器
simulator.init();

// 渲染组件
simulator.render(MyComponent, schema);

// 销毁模拟器
simulator.destroy();
```

### 设备切换

```typescript
// 切换到 iPhone 设备
simulator.setDevice(PRESET_DEVICES[0]);

// 切换到 iPad 设备
simulator.setDevice(PRESET_DEVICES[3]);

// 切换到 Desktop 设备
simulator.setDevice(PRESET_DEVICES[4]);
```

### 缩放控制

```typescript
// 设置 2x 缩放
simulator.setScale(2);

// 设置 1.5x 缩放
simulator.setScale(1.5);

// 恢复默认缩放
simulator.reset();
```

### 自定义设备

```typescript
// 添加自定义设备
SimulatorRenderer.addPresetDevice({
  name: 'Custom Device',
  width: 800,
  height: 600,
  scale: 1,
  description: 'Custom Device - 800x600 @1x',
});

// 使用自定义设备
const customDevice = {
  name: 'Custom Device',
  width: 800,
  height: 600,
  scale: 1,
  description: 'Custom Device - 800x600 @1x',
};
simulator.setDevice(customDevice);
```

### 样式自定义

```typescript
// 设置自定义样式
simulator.setStyles({
  backgroundColor: '#f0f0f0',
  borderColor: '#e0e0e0',
  borderRadius: '12px',
});

// 设置自定义类名
simulator.setClassName('my-simulator');
```

### 获取设备信息

```typescript
// 获取当前设备信息
const deviceInfo = simulator.getDeviceInfo();
console.log('Device:', deviceInfo.device);
console.log('Width:', deviceInfo.width);
console.log('Height:', deviceInfo.height);
console.log('Scale:', deviceInfo.scale);
```

## 最佳实践

1. **初始化**: 在使用模拟器前，先调用 `init()` 方法
2. **容器设置**: 确保容器元素存在，并且有足够的尺寸
3. **设备选择**: 根据目标设备选择合适的预设设备
4. **缩放控制**: 合理使用缩放功能，避免过度缩放
5. **样式自定义**: 使用样式自定义功能来美化模拟器外观
6. **资源清理**: 使用完毕后调用 `destroy()` 方法清理资源
7. **错误处理**: 设置 `errorBoundary` 和 `errorHandler` 来处理错误
8. **调试**: 启用 `debug` 模式来查看日志

## TypeScript 支持

本包完全支持 TypeScript，提供完整的类型定义：

```typescript
import {
  SimulatorRenderer,
  SimulatorConfig,
  SimulatorDevice,
  PRESET_DEVICES,
} from '@vue3-lowcode/vue-simulator-renderer';
```

## 依赖

- `@vue3-lowcode/types`: 类型定义
- `@vue3-lowcode/utils`: 工具库
- `@vue3-lowcode/renderer-core`: 渲染器核心
- `@vue3-lowcode/vue-renderer`: Vue 渲染器
- `vue`: Vue3 框架

## 许可证

MIT
