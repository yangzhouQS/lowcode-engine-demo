# Dragon - 拖拽引擎

## 功能概述

[`Dragon`](packages/designer/src/designer/dragon.ts:108) 是低代码引擎的核心拖拽引擎，负责处理所有的拖拽操作，包括节点拖拽、外部拖拽、复制拖拽等。

## 主要功能

1. **拖拽生命周期管理**：管理拖拽的开始、进行中、结束三个阶段
2. **拖拽对象类型支持**：支持多种拖拽对象类型（节点、节点数据、其他对象）
3. **投放感应器管理**：管理多个投放感应器，支持跨区域拖拽
4. **坐标转换**：处理全局坐标和局部坐标的转换
5. **拖拽状态管理**：管理拖拽态、拷贝态、原生选区等状态
6. **事件分发**：发送拖拽相关事件
7. **磁贴布局支持**：支持磁贴布局的拖拽投放

## 类定义

```typescript
export class Dragon implements IDragon {
  private sensors: IPublicModelSensor[] = [];
  private nodeInstPointerEvents: boolean;
  key: number;
  
  @obx.ref private _activeSensor: IPublicModelSensor | undefined;
  @obx.ref private _dragging = false;
  @obx.ref private _canDrop = false;
  
  get dragging(): boolean;
  get activeSensor(): IPublicModelSensor | undefined;
  viewName: string | undefined;
  emitter: IEventBus;
  
  constructor(readonly designer: IDesigner);
  
  from(shell: Element, boost: (e: MouseEvent) => IPublicModelDragObject | null): () => void;
  boost(dragObject: IPublicModelDragObject, boostEvent: MouseEvent | DragEvent, fromRglNode?: INode | IPublicModelNode): void;
  addSensor(sensor: any): void;
  removeSensor(sensor: any): void;
  onDragstart(func: (e: ILocateEvent) => any): () => void;
  onDrag(func: (e: ILocateEvent) => any): () => void;
  onDragend(func: (x: { dragObject: IPublicModelDragObject; copy: boolean }) => any): () => void;
}
```

## 主要属性

### sensors
投放感应器列表，用于处理拖拽投放。

类型：`IPublicModelSensor[]`

### dragging
是否正在拖拽中。

类型：`boolean`

### activeSensor
当前激活的感应器，用于高亮投放区域。

类型：`IPublicModelSensor | undefined`

### emitter
事件总线，用于发送拖拽相关事件。

类型：`IEventBus`

## 主要方法

### from(shell: Element, boost: (e: MouseEvent) => IPublicModelDragObject | null): () => void
快速监听一个容器元素的拖拽行为。

**参数：**
- `shell`: 容器元素
- `boost`: 获取拖拽对象的函数

**返回值：** 清理函数

**功能：**
- 在容器上监听 mousedown 事件
- 当按下鼠标时，调用 boost 函数获取拖拽对象
- 如果有拖拽对象，调用 boost 方法启动拖拽
- 返回清理函数，用于移除事件监听

**使用示例：**
```typescript
const dispose = dragon.from(container, (e) => {
  const node = getNodeFromEvent(e);
  if (node) {
    return {
      type: IPublicEnumDragObjectType.Node,
      nodes: [node],
    };
  }
  return null;
});

// 清理
dispose();
```

### boost(dragObject: IPublicModelDragObject, boostEvent: MouseEvent | DragEvent, fromRglNode?: INode | IPublicModelNode)
启动拖拽，发射拖拽对象。

**参数：**
- `dragObject`: 拖拽对象
- `boostEvent`: 拖拽初始事件
- `fromRglNode`: 磁贴节点（可选）

**拖拽对象类型：**
```typescript
// 节点拖拽
type IPublicTypeDragNodeObject = {
  type: IPublicEnumDragObjectType.Node;
  nodes: INode[];
};

// 节点数据拖拽
type IPublicTypeDragNodeDataObject = {
  type: IPublicEnumDragObjectType.NodeData;
  data: IPublicTypeNodeData | IPublicTypeNodeData[];
};

// 其他对象拖拽
type IPublicTypeDragAnyObject = {
  type: string;
  data: any;
};
```

**功能：**
1. 初始化拖拽状态
2. 设置鼠标事件监听
3. 处理拖拽移动事件
4. 处理拖拽结束事件
5. 管理拖拽态、拷贝态
6. 处理 ESC 键取消拖拽
7. 支持磁贴布局拖拽

**拖拽流程：**
```
boost() 调用
    ↓
mousedown 事件处理
    ↓
mousemove 事件处理（检查是否 shaken）
    ↓
dragstart（第一次 shaken 后）
    ↓
drag（持续移动）
    ↓
mouseup/dragend
    ↓
dragend（清理状态）
```

### addSensor(sensor: any)
添加投放感应器。

**参数：**
- `sensor`: 感应器对象

**功能：**
- 将感应器添加到 sensors 列表中
- 用于处理拖拽投放

### removeSensor(sensor: any)
移除投放感应器。

**参数：**
- `sensor`: 感应器对象

**功能：**
- 从 sensors 列表中移除感应器

### onDragstart(func: (e: ILocateEvent) => any): () => void
监听拖拽开始事件。

**参数：**
- `func`: 事件处理函数

**返回值：** 清理函数

**使用示例：**
```typescript
const dispose = dragon.onDragstart((e) => {
  console.log('Drag started', e.dragObject);
});

// 清理
dispose();
```

### onDrag(func: (e: ILocateEvent) => any): () => void
监听拖拽过程事件。

**参数：**
- `func`: 事件处理函数

**返回值：** 清理函数

**使用示例：**
```typescript
const dispose = dragon.onDrag((e) => {
  console.log('Dragging', e.dragObject);
});

// 清理
dispose();
```

### onDragend(func: (x: { dragObject: IPublicModelDragObject; copy: boolean }) => any): () => void
监听拖拽结束事件。

**参数：**
- `func`: 事件处理函数

**返回值：** 清理函数

**使用示例：**
```typescript
const dispose = dragon.onDragend(({ dragObject, copy }) => {
  console.log('Drag ended', dragObject, copy);
});

// 清理
dispose();
```

## 工具函数

### isDragNodeObject(obj: any): obj is IPublicTypeDragNodeObject
判断是否为节点拖拽对象。

```typescript
function isDragNodeObject(obj: any): obj is IPublicTypeDragNodeObject {
  return obj && obj.type === IPublicEnumDragObjectType.Node;
}
```

### isDragNodeDataObject(obj: any): obj is IPublicTypeDragNodeDataObject
判断是否为节点数据拖拽对象。

```typescript
function isDragNodeDataObject(obj: any): obj is IPublicTypeDragNodeDataObject {
  return obj && obj.type === IPublicEnumDragObjectType.NodeData;
}
```

### isDragAnyObject(obj: any): obj is IPublicTypeDragAnyObject
判断是否为其他对象拖拽对象。

```typescript
function isDragAnyObject(obj: any): obj is IPublicTypeDragAnyObject {
  return obj && obj.type !== IPublicEnumDragObjectType.NodeData && obj.type !== IPublicEnumDragObjectType.Node;
}
```

### isShaken(e1: MouseEvent | DragEvent, e2: MouseEvent | DragEvent): boolean
检查两个事件是否发生了抖动（鼠标移动距离超过阈值）。

```typescript
function isShaken(e1: MouseEvent | DragEvent, e2: MouseEvent | DragEvent): boolean {
  if ((e1 as any).shaken) {
    return true;
  }
  if (e1.target !== e2.target) {
    return true;
  }
  return (
    Math.pow(e1.clientY - e2.clientY, 2) + Math.pow(e1.clientX - e2.clientX, 2) > SHAKE_DISTANCE
  );
}
```

### isSameAs(e1: MouseEvent | DragEvent, e2: MouseEvent | DragEvent): boolean
检查两个事件是否相同。

```typescript
function isSameAs(e1: MouseEvent | DragEvent, e2: MouseEvent | DragEvent): boolean {
  return e1.clientY === e2.clientY && e1.clientX === e2.clientX;
}
```

## 拖拽状态管理

### 拖拽态
拖拽过程中，所有模拟器会进入拖拽态。

```typescript
setDraggingState(state: boolean) {
  cursor.setDragging(state);
  this.getSimulators().forEach((sim) => {
    sim?.setDraggingState(state);
  });
}
```

### 拷贝态
当按住 Alt 或 Ctrl 键时，进入拷贝态。

```typescript
setCopyState(state: boolean) {
  cursor.setCopy(state);
  this.getSimulators().forEach((sim) => {
    sim?.setCopyState(state);
  });
}
```

### 原生选区
拖拽过程中禁用原生选区。

```typescript
setNativeSelection(enableFlag: boolean) {
  setNativeSelection(enableFlag);
  this.getSimulators().forEach((sim) => {
    sim?.setNativeSelection(enableFlag);
  });
}
```

## 坐标转换

### 全局坐标到局部坐标
将全局坐标转换为模拟器的局部坐标。

```typescript
const l = this.viewport.toLocalPoint({
  clientX: e.globalX,
  clientY: e.globalY,
});
e.canvasX = l.clientX;
e.canvasY = l.clientY;
```

### 局部坐标到全局坐标
将模拟器的局部坐标转换为全局坐标。

```typescript
const g = srcSim.viewport.toGlobalPoint(e);
evt.globalX = g.clientX;
evt.globalY = g.clientY;
```

## 磁贴布局支持

Dragon 支持磁贴布局的拖拽投放：

1. **检测磁贴容器**：检查拖拽目标是否为磁贴容器
2. **处理磁贴投放**：计算磁贴投放位置
3. **发送磁贴事件**：发送磁贴相关的自定义事件
4. **占位符管理**：管理磁贴投放时的占位符

```typescript
const { isRGL, rglNode } = getRGL(e);

if (isRGL) {
  // 禁止被拖拽元素的阻断
  const nodeInst = dragObject.nodes[0].getDOMNode();
  if (nodeInst && nodeInst.style) {
    this.nodeInstPointerEvents = true;
    nodeInst.style.pointerEvents = 'none';
  }
  
  // 原生拖拽
  this.emitter.emit('rgl.sleeping', false);
  
  if (fromRglNode && fromRglNode.id === rglNode.id) {
    designer.clearLocation();
    this.clearState();
    this.emitter.emit('drag', locateEvent);
    return;
  }
  
  this._canDrop = !!sensor?.locate(locateEvent);
  if (this._canDrop) {
    this.emitter.emit('rgl.add.placeholder', {
      rglNode,
      fromRglNode,
      node: locateEvent.dragObject?.nodes[0],
      event: e,
    });
    designer.clearLocation();
    this.clearState();
    this.emitter.emit('drag', locateEvent);
    return;
  }
}
```

## 使用示例

### 启动节点拖拽

```typescript
import { Dragon } from '@alilc/lowcode-designer';

const dragon = new Dragon(designer);

// 启动拖拽
dragon.boost(
  {
    type: IPublicEnumDragObjectType.Node,
    nodes: [selectedNode],
  },
  mousedownEvent,
);
```

### 监听拖拽事件

```typescript
// 监听拖拽开始
dragon.onDragstart((e) => {
  console.log('Drag started', e.dragObject);
});

// 监听拖拽过程
dragon.onDrag((e) => {
  console.log('Dragging', e.dragObject);
});

// 监听拖拽结束
dragon.onDragend(({ dragObject, copy }) => {
  console.log('Drag ended', dragObject, copy);
});
```

### 添加投放感应器

```typescript
// 添加感应器
dragon.addSensor(simulator);

// 移除感应器
dragon.removeSensor(simulator);
```

### 使用 from 方法快速设置拖拽

```typescript
const dispose = dragon.from(container, (e) => {
  const node = getNodeFromElement(e.target);
  if (node) {
    return {
      type: IPublicEnumDragObjectType.Node,
      nodes: [node],
    };
  }
  return null;
});

// 清理
dispose();
```

## 注意事项

1. **抖动检测**：鼠标移动距离超过阈值（4px）才会触发拖拽
2. **ESC 取消**：按 ESC 键可以取消拖拽
3. **拷贝模式**：按 Alt 或 Ctrl 键可以进入拷贝模式
4. **Slot 节点**：Slot 节点拖拽时强制进入拷贝模式
5. **磁贴布局**：磁贴布局有特殊的拖拽处理逻辑
6. **事件清理**：拖拽结束后会自动清理所有事件监听
7. **感应器选择**：会自动选择合适的感应器处理拖拽投放
8. **原生拖拽**：支持 HTML5 原生拖拽 API

## 相关文件

- [`designer.ts`](./designer.md) - 设计器核心
- [`location.ts`](./location.md) - 位置管理
- [`detecting.ts`](./detecting.md) - 悬停检测
- [`../builtin-simulator/host.ts`](../builtin-simulator/host.md) - 模拟器宿主

## 外部依赖

- `@alilc/lowcode-editor-core`: 编辑器核心库
- `@alilc/lowcode-types`: 类型定义
- `@alilc/lowcode-utils`: 工具函数
