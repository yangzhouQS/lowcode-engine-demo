# Dragon 拖拽引擎 - 使用指南

## 📖 概述

Dragon 是低代码引擎的拖拽核心模块，负责管理整个拖拽生命周期。本文档介绍如何使用 Vue3 版本的 Dragon 拖拽引擎。

## 🚀 快速开始

### 基础用法

```vue
<template>
  <div>
    <!-- 拖拽源：组件面板 -->
    <div ref="componentPanel" class="component-panel">
      <div
        v-for="component in components"
        :key="component.name"
        class="component-item"
        :data-component="component.name"
      >
        {{ component.title }}
      </div>
    </div>

    <!-- 画布区域 -->
    <div ref="canvas" class="canvas">
      <!-- 模拟器内容 -->
    </div>

    <!-- 拖拽幽灵组件 -->
    <DragGhost :designer="designer" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Dragon, DragGhost } from '@vue3-lowcode/designer';
import { IPublicEnumDragObjectType } from '@vue3-lowcode/types';

const componentPanel = ref<HTMLElement>();
const canvas = ref<HTMLElement>();
const designer = ref<Designer>();

// 组件列表
const components = [
  { name: 'Button', title: '按钮' },
  { name: 'Input', title: '输入框' },
  { name: 'Text', title: '文本' },
];

onMounted(() => {
  // 1. 获取 designer 实例（从上下文或创建）
  designer.value = createDesigner();

  const dragon = designer.value.dragon;

  // 2. 绑定组件面板作为拖拽源
  if (componentPanel.value) {
    dragon.from(componentPanel.value, (e: MouseEvent) => {
      // 获取点击的组件名称
      const target = e.target as HTMLElement;
      const componentName = target.dataset.component;

      if (!componentName) {
        return null;
      }

      // 返回拖拽对象
      return {
        type: IPublicEnumDragObjectType.NodeData,
        data: [{
          componentName,
          props: {},
        }],
      };
    });
  }

  // 3. 监听拖拽事件
  dragon.onDragstart((e) => {
    console.log('拖拽开始', e.dragObject);
  });

  dragon.onDrag((e) => {
    console.log('拖拽中', e.globalX, e.globalY);
  });

  dragon.onDragend((e) => {
    console.log('拖拽结束', e.dragObject, e.copy);
  });
});

onUnmounted(() => {
  // 清理资源
  designer.value?.dispose();
});
</script>

<style scoped>
.component-panel {
  width: 200px;
  height: 100vh;
  background: #f5f5f5;
  padding: 10px;
}

.component-item {
  padding: 10px;
  margin: 5px 0;
  background: white;
  cursor: grab;
  user-select: none;
}

.component-item:active {
  cursor: grabbing;
}

.canvas {
  flex: 1;
  background: white;
  border: 1px solid #ddd;
}
</style>
```

## 🔧 核心 API

### Dragon 类

#### from(shell, boost)

绑定 DOM 元素作为拖拽源。

**参数：**
- `shell: Element` - 容器元素
- `boost: (e: MouseEvent) => IPublicModelDragObject | null` - 从鼠标事件获取拖拽对象的函数

**返回：**
- `() => void` - 清理函数

**示例：**

```typescript
dragon.from(document.querySelector('.panel'), (e) => {
  const componentMeta = getComponentMeta(e.target);

  return {
    type: IPublicEnumDragObjectType.NodeData,
    data: [{
      componentName: componentMeta.componentName,
      props: {},
    }],
  };
});
```

#### boost(dragObject, boostEvent, fromRglNode?)

直接启动拖拽。

**参数：**
- `dragObject: IPublicModelDragObject` - 拖拽对象
- `boostEvent: MouseEvent | DragEvent` - 初始事件
- `fromRglNode?: INode | IPublicModelNode` - 是否来自 RGL 节点

**示例：**

```typescript
// 从画布内节点拖拽
const node = document.getNode(nodeId);

dragon.boost(
  {
    type: IPublicEnumDragObjectType.Node,
    nodes: [node],
  },
  mouseEvent
);
```

### 事件监听

#### onDragstart(func)

监听拖拽开始事件。

**示例：**

```typescript
dragon.onDragstart((e) => {
  const { dragObject } = e;

  if (isDragNodeObject(dragObject)) {
    // 选中拖拽的节点
    dragObject.nodes[0].select();
  } else {
    // 清除选中
    designer.selection.clear();
  }
});
```

#### onDrag(func)

监听拖拽进行事件。

**示例：**

```typescript
dragon.onDrag((e) => {
  const { globalX, globalY, sensor } = e;

  // 更新投放指示器位置
  updateIndicator(globalX, globalY);

  // 通知 simulator 进行定位
  if (sensor) {
    sensor.locate(e);
  }
});
```

#### onDragend(func)

监听拖拽结束事件。

**示例：**

```typescript
dragon.onDragend(({ dragObject, copy }) => {
  const loc = designer.currentLocation;

  if (loc) {
    if (isDragNodeObject(dragObject)) {
      // 移动或复制节点
      insertChildren(
        loc.target,
        dragObject.nodes,
        loc.detail.index,
        copy
      );
    } else if (isDragNodeDataObject(dragObject)) {
      // 插入新节点
      insertChildren(
        loc.target,
        dragObject.data,
        loc.detail.index
      );
    }
  }
});
```

### 拖拽对象类型

#### NodeData - 节点数据

用于拖拽新组件到画布：

```typescript
{
  type: IPublicEnumDragObjectType.NodeData,
  data: [
    {
      componentName: 'Button',
      props: {
        text: '点击我',
      },
    }
  ],
}
```

#### Node - 已有节点

用于拖拽画布内已有节点：

```typescript
{
  type: IPublicEnumDragObjectType.Node,
  nodes: [node1, node2],
}
```

### 状态控制

#### 获取拖拽状态

```typescript
// 是否正在拖拽
const isDragging = dragon.isDragging;

// 当前激活的感应器
const activeSensor = dragon._activeSensor;
```

#### 拖拽辅助方法

```typescript
// 设置拖拽态
dragon.setDraggingState(true);

// 设置复制态（按住 Ctrl/Option）
dragon.setCopyState(true);

// 清除所有状态
dragon.clearState();
```

## 🎨 高级用法

### 1. 自定义投放感应器

```typescript
import { IPublicModelSensor } from '@vue3-lowcode/types';

class CustomSensor implements IPublicModelSensor {
  sensorAvailable = true;

  isEnter(e: IPublicModelLocateEvent): boolean {
    // 判断是否进入感应区
    const rect = this.container.getBoundingClientRect();
    return (
      e.globalX >= rect.left &&
      e.globalX <= rect.right &&
      e.globalY >= rect.top &&
      e.globalY <= rect.bottom
    );
  }

  fixEvent(e: IPublicModelLocateEvent): IPublicModelLocateEvent {
    // 修正事件坐标
    const rect = this.container.getBoundingClientRect();
    e.canvasX = e.globalX - rect.left;
    e.canvasY = e.globalY - rect.top;
    return e;
  }

  locate(e: IPublicModelLocateEvent): IPublicModelDropLocation | null {
    // 计算投放位置
    const index = this.calculateInsertIndex(e);
    return designer.createLocation({
      target: this.container,
      detail: { type: 'Children', index },
    });
  }

  deactiveSensor(): void {
    // 离开感应区时的清理工作
    this.highlighted = false;
  }
}

// 注册感应器
const sensor = new CustomSensor(container);
dragon.addSensor(sensor);
```

### 2. 复制态控制

```typescript
// 监听 Ctrl/Option 键
dragon.onDrag((e) => {
  const isCopy = e.originalEvent.ctrlKey || e.originalEvent.altKey;

  if (isCopy) {
    dragon.setCopyState(true);
  } else {
    dragon.setCopyState(false);
  }
});
```

### 3. ESC 取消拖拽

Dragon 内置支持 ESC 键取消拖拽，无需额外处理。

如果需要自定义取消逻辑：

```typescript
dragon.onDragend((e) => {
  // 检查是否被取消
  if (e.dragObject === null) {
    console.log('拖拽已取消');
  }
});
```

### 4. 跨 iframe 拖拽

Dragon 自动处理跨 iframe 拖拽，确保在所有 iframe 中都能正确处理事件。

```typescript
// Simulator 会自动注册为 Sensor
// Dragon 会将事件监听器注册到所有相关文档

const sensors = designer.project.documents
  .map(doc => doc.simulator)
  .filter(Boolean);

// Dragon 内部会使用 makeEventsHandler 处理跨文档事件
```

### 5. RGL（网格布局）支持

```typescript
// 检测是否为 RGL 容器
dragon.onDrag((e) => {
  if (isSimulatorHost(e.sensor)) {
    const container = e.sensor.getDropContainer(e);
    if (container?.container.componentMeta.advanced.isAbsoluteLayoutContainer) {
      // RGL 特殊处理
      console.log('拖拽到网格布局容器');
    }
  }
});
```

## 📝 最佳实践

### 1. 性能优化

```typescript
// 使用 requestAnimationFrame 优化拖拽性能
let rafId: number | null = null;

dragon.onDrag((e) => {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }

  rafId = requestAnimationFrame(() => {
    updateIndicator(e.globalX, e.globalY);
    rafId = null;
  });
});
```

### 2. 内存管理

```typescript
// 组件卸载时清理事件监听
onUnmounted(() => {
  // Dragon 会自动清理内部事件监听
  // 但需要清理外部引用
  designer.value?.dispose();
});
```

### 3. 错误处理

```typescript
dragon.onDragend(({ dragObject, copy }) => {
  try {
    // 执行插入操作
    insertNode(dragObject, copy);
  } catch (error) {
    console.error('插入节点失败', error);
    // 显示错误提示
    showError('拖拽失败，请重试');
  }
});
```

### 4. 边界情况处理

```typescript
dragon.onDrag((e) => {
  // 检查是否在有效区域内
  if (!isValidDropArea(e.globalX, e.globalY)) {
    designer.clearLocation();
    return;
  }

  // 继续处理...
});
```

## 🧪 测试

### 单元测试示例

```typescript
import { describe, it, expect, vi } from 'vitest';
import { Dragon } from '@vue3-lowcode/designer';
import { IPublicEnumDragObjectType } from '@vue3-lowcode/types';

describe('Dragon', () => {
  it('should start drag when shaken', () => {
    const designer = createMockDesigner();
    const dragon = designer.dragon;

    const dragstartSpy = vi.fn();
    dragon.onDragstart(dragstartSpy);

    // 模拟鼠标按下
    const mousedownEvent = new MouseEvent('mousedown', {
      clientX: 100,
      clientY: 100,
    });

    // 模拟鼠标移动（超过抖动阈值）
    const mousemoveEvent = new MouseEvent('mousemove', {
      clientX: 110,
      clientY: 110,
    });

    dragon.boost(
      {
        type: IPublicEnumDragObjectType.NodeData,
        data: [{ componentName: 'Button' }],
      },
      mousedownEvent
    );

    // 触发 mousemove
    document.dispatchEvent(mousemoveEvent);

    expect(dragstartSpy).toHaveBeenCalled();
  });
});
```

## 🔗 相关资源

- [Dragon API 文档](./api.md)
- [拖拽系统架构](./architecture.md)
- [迁移指南](./migration.md)
- [常见问题](./faq.md)

## 📄 License

MIT
