# Dragon 拖拽引擎 Vue3 迁移计划

## 📋 项目概述

**目标**：将阿里低代码引擎的 Dragon 拖拽引擎从 React 迁移到 Vue3

**当前状态**：
- ✅ 原版 Dragon（React + Mobx）：640 行，功能完整
- ⚠️ Vue3 版本：206 行，功能不完整

**预计工期**：4-6 周

**技术栈**：
- Vue 3.4+
- TypeScript 5+
- 原生 DOM API
- 跨框架兼容设计

---

## 🎯 迁移原则

1. **API 兼容性**：保持公共接口 `IPublicModelDragon` 不变
2. **事件名称一致**：dragstart、drag、dragend 事件名保持不变
3. **渐进式迁移**：分阶段实现，每个阶段可独立测试
4. **性能优先**：使用 requestAnimationFrame 优化拖拽性能
5. **充分测试**：单元测试覆盖率 > 80%

---

## 📊 迁移阶段划分

### 阶段 1：核心基础（Week 1）

**目标**：建立 Dragon 类基础框架和状态管理

**任务**：
- [x] 1.1 创建 Vue3 Dragon 类骨架
- [ ] 1.2 实现响应式状态管理（ref 替代 @obx）
- [ ] 1.3 实现事件总线系统
- [ ] 1.4 实现 Shaken 检测逻辑
- [ ] 1.5 基础工具函数（makeEventsHandler、createLocateEvent）

**交付物**：
- `Dragon.ts` - 核心类框架（300 行）
- `utils.ts` - 工具函数
- 基础单元测试

**验收标准**：
- Dragon 类可实例化
- 状态管理可读写
- 事件可正常触发和监听

---

### 阶段 2：拖拽启动逻辑（Week 1-2）

**目标**：实现拖拽启动的核心方法

**任务**：
- [ ] 2.1 实现 `boost` 方法
  - [ ] 事件监听器注册（mousemove、mouseup、keydown）
  - [ ] 跨文档事件处理
  - [ ] 拖拽状态设置
- [ ] 2.2 实现 `from` 方法
  - [ ] DOM 元素绑定
  - [ ] boost 函数封装
  - [ ] 事件委托处理
- [ ] 2.3 拖拽取消机制（ESC 键）
- [ ] 2.4 复制态控制（Ctrl/Option 键）

**交付物**：
- `boost` 方法实现（150 行）
- `from` 方法实现（50 行）
- 交互测试用例

**验收标准**：
- 可通过 `boost` 启动拖拽
- 可通过 `from` 绑定 DOM 元素
- 按 ESC 可取消拖拽
- 按住 Ctrl 可进入复制态

---

### 阶段 3：Sensor 系统（Week 2）

**目标**：实现投放感应器系统

**任务**：
- [ ] 3.1 定义 Sensor 接口
  - [ ] `IPublicModelSensor` 类型定义
  - [ ] `fixEvent` 方法
  - [ ] `locate` 方法
  - [ ] `isEnter` 方法
- [ ] 3.2 实现 Sensor 管理器
  - [ ] `addSensor` 方法
  - [ ] `removeSensor` 方法
  - [ ] `chooseSensor` 逻辑
- [ ] 3.3 BuiltinSimulatorHost 集成
  - [ ] 实现 Sensor 接口
  - [ ] 坐标系统转换
  - [ ] 跨 iframe 通信

**交付物**：
- `sensor.ts` - Sensor 接口定义
- `BuiltinSimulatorHost.ts` - Simulator 实现
- Sensor 测试用例

**验收标准**：
- Sensor 可正确注册和注销
- 可正确选择激活的 Sensor
- 坐标转换准确无误

---

### 阶段 4：坐标系统（Week 2-3）

**目标**：实现全局/画布坐标转换

**任务**：
- [ ] 4.1 创建 LocateEvent 类型
  - [ ] 全局坐标（globalX、globalY）
  - [ ] 画布坐标（canvasX、canvasY）
  - [ ] 原始事件引用
- [ ] 4.2 实现坐标转换函数
  - [ ] `toGlobalPoint` - 画布坐标 → 全局坐标
  - [ ] `toCanvasPoint` - 全局坐标 → 画布坐标
  - [ ] iframe 坐标映射
- [ ] 4.3 跨文档事件处理
  - [ ] 获取所有相关文档（主文档 + iframe）
  - [ ] 事件监听器批量注册
  - [ ] 事件源识别

**交付物**：
- `coordinate.ts` - 坐标转换工具
- `event.ts` - 事件处理工具
- 坐标测试用例

**验收标准**：
- 坐标转换准确（误差 < 1px）
- 支持 iframe 嵌套
- 多 Simulator 并发工作正常

---

### 阶段 5：投放定位算法（Week 3）

**目标**：实现智能投放位置计算

**任务**：
- [ ] 5.1 容器识别
  - [ ] 从事件目标获取节点
  - [ ] 向上查找父容器
  - [ ] 容器有效性检查
- [ ] 5.2 位置计算
  - [ ] 遍历子节点
  - [ ] 计算距离最近节点
  - [ ] 判断 before/after
  - [ ] 判断垂直/水平布局
- [ ] 5.3 DropLocation 创建
  - [ ] 目标容器
  - [ ] 插入位置
  - [ ] 参考节点
- [ ] 5.4 边界情况处理
  - [ ] 空容器
  - [ ] 拖拽对象包含容器
  - [ ] 不可投放区域

**交付物**：
- `location.ts` - 投放定位逻辑
- `drop-location.ts` - DropLocation 类
- 定位算法测试

**验收标准**：
- 可正确识别投放容器
- 位置计算准确
- 边界情况处理正确

---

### 阶段 6：UI 组件（Week 3-4）

**目标**：重写拖拽相关 UI 组件

**任务**：
- [ ] 6.1 DragGhost 组件
  - [ ] Vue3 版本重写
  - [ ] 拖拽预览效果
  - [ ] 响应式位置更新
  - [ ] 多节点拖拽支持
- [ ] 6.2 样式适配
  - [ ] CSS Modules 或 Scoped Styles
  - [ ] 与原版保持一致的视觉效果
- [ ] 6.3 性能优化
  - [ ] 使用 transform 代替 left/top
  - [ ] requestAnimationFrame 优化

**交付物**：
- `DragGhost.vue` - Vue3 组件
- `ghost.css` - 样式文件
- 组件测试

**验收标准**：
- 视觉效果与原版一致
- 拖拽流畅无卡顿
- 响应式更新正常

---

### 阶段 7：高级功能（Week 4-5）

**目标**：实现高级拖拽特性

**任务**：
- [ ] 7.1 RGL（网格布局）支持
  - [ ] 评估 vue-grid-layout 或 vue-masonry
  - [ ] 实现 RGL Sensor
  - [ ] 网格吸附逻辑
  - [ ] 占位符显示
- [ ] 7.2 拖拽态控制
  - [ ] 禁止拖拽配置
  - [ ] 拖拽限制区域
  - [ ] 拖拽样式定制
- [ ] 7.3 特殊节点处理
  - [ ] 固定节点
  - [ ] 锁定节点
  - [ ] 条件投放

**交付物**：
- RGL 集成代码（可选）
- 拖拽态控制逻辑
- 高级功能测试

**验收标准**：
- RGL 拖拽正常（如需要）
- 特殊节点正确处理
- 配置项生效

---

### 阶段 8：测试与优化（Week 5-6）

**目标**：完善测试覆盖和性能优化

**任务**：
- [ ] 8.1 单元测试
  - [ ] Dragon 类测试（覆盖所有方法）
  - [ ] Sensor 测试
  - [ ] 坐标转换测试
  - [ ] 定位算法测试
- [ ] 8.2 集成测试
  - [ ] 完整拖拽流程测试
  - [ ] 跨 Simulator 测试
  - [ ] 边界情况测试
- [ ] 8.3 性能优化
  - [ ] 拖拽性能分析
  - [ ] 事件节流/防抖
  - [ ] 内存泄漏检查
- [ ] 8.4 兼容性测试
  - [ ] Chrome/Edge/Firefox/Safari
  - [ ] 不同分辨率
  - [ ] iframe 嵌套场景

**交付物**：
- 完整测试套件（覆盖率 > 80%）
- 性能优化报告
- 浏览器兼容性报告

**验收标准**：
- 测试覆盖率 > 80%
- 所有测试用例通过
- 拖拽帧率 > 60fps

---

## 📁 文件结构

```
vue3-packages/packages/designer/src/
├── dragon/
│   ├── Dragon.ts                 # Dragon 核心类（主文件，500+ 行）
│   ├── types.ts                  # 类型定义
│   ├── utils.ts                  # 工具函数
│   ├── coordinate.ts             # 坐标转换
│   ├── event.ts                  # 事件处理
│   └── index.ts                  # 导出
├── sensor/
│   ├── Sensor.ts                 # Sensor 接口
│   ├── BuiltinSimulatorSensor.ts # Simulator Sensor 实现
│   └── index.ts
├── location/
│   ├── Location.ts               # 投放位置类
│   ├── DropLocation.ts           # DropLocation 实现
│   └── index.ts
├── components/
│   ├── DragGhost.vue             # 拖拽幽灵组件
│   └── styles/
│       └── ghost.css
├── simulator/
│   └── BuiltinSimulatorHost.ts   # 模拟器主机（已存在，需增强）
└── __tests__/
    ├── dragon.test.ts
    ├── sensor.test.ts
    ├── coordinate.test.ts
    └── integration.test.ts
```

---

## 🔑 关键代码片段参考

### 1. Dragon 类基础结构

```typescript
import { ref, computed, type Ref } from 'vue';
import { IPublicModelDragon, IPublicTypeDragObject, IPublicModelLocateEvent } from '@vue3-lowcode/types';
import { useEventBus } from '@vue3-lowcode/utils';

export class Dragon implements IPublicModelDragon {
  private dragActive: Ref<boolean> = ref(false);
  private dragData: Ref<IPublicTypeDragObject | null> = ref(null);
  private dragPosition: Ref<{ x: number; y: number }> = ref({ x: 0, y: 0 });
  private dropTarget: Ref<any | null> = ref(null);

  private eventBus = useEventBus('Dragon');
  private sensors: Ref<IPublicModelSensor[]> = ref([]);
  private activeSensor: Ref<IPublicModelSensor | undefined> = ref(undefined);

  get dragging(): boolean {
    return this.dragActive.value;
  }

  onDragstart(func: (e: IPublicModelLocateEvent) => any): IPublicTypeDisposable {
    return this.eventBus.on('dragstart', func);
  }

  onDrag(func: (e: IPublicModelLocateEvent) => any): IPublicTypeDisposable {
    return this.eventBus.on('drag', func);
  }

  onDragend(func: (o: { dragObject: IPublicTypeDragObject; copy?: boolean }) => any): IPublicTypeDisposable {
    return this.eventBus.on('dragend', func);
  }

  // ... 更多方法
}
```

### 2. boost 方法骨架

```typescript
boost(dragObject: IPublicTypeDragObject, boostEvent: MouseEvent | DragEvent): void {
  this.dragData.value = dragObject;
  this.dragActive.value = false; // 等待 shaken 检测

  const handleEvents = makeEventsHandler(boostEvent, this.sensors.value);

  let moved = false;

  const move = (e: MouseEvent | DragEvent) => {
    if (!moved) {
      if (isShaken(boostEvent, e)) {
        moved = true;
        this.dragActive.value = true;
        this.eventBus.emit('dragstart', createLocateEvent(e, dragObject));
      }
    }

    if (moved) {
      const locateEvent = createLocateEvent(e, dragObject);
      const sensor = this.chooseSensor(locateEvent);

      if (sensor) {
        sensor.fixEvent(locateEvent);
        sensor.locate(locateEvent);
      }

      this.eventBus.emit('drag', locateEvent);
    }
  };

  const over = (e?: MouseEvent | DragEvent) => {
    if (moved) {
      this.eventBus.emit('dragend', { dragObject, copy: this.checkCopy(e) });
    }

    this.clearState();
    handleEvents((doc) => {
      doc.removeEventListener('mousemove', move, true);
      doc.removeEventListener('mouseup', over, true);
    });
  };

  handleEvents((doc) => {
    doc.addEventListener('mousemove', move, true);
    doc.addEventListener('mouseup', over, true);
  });
}
```

### 3. DragGhost 组件骨架

```vue
<template>
  <div
    v-if="titles && titles.length"
    class="lc-ghost-group"
    :style="{ transform: `translate(${x}px, ${y}px)` }"
  >
    <div v-for="(title, i) in titles" :key="i" class="lc-ghost">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import type { Designer } from '@vue3-lowcode/designer';

const props = defineProps<{
  designer: Designer;
}>();

const x = ref(0);
const y = ref(0);
const titles = ref<(string | object)[]>([]);

let dispose: (() => void) | null = null;

onMounted(() => {
  const dragon = props.designer.dragon;

  // 监听 drag 事件更新位置
  dispose = dragon.onDrag((e: any) => {
    x.value = e.globalX;
    y.value = e.globalY;
    titles.value = e.dragObject.nodes?.map((n: any) => n.title) || [];
  });
});

onUnmounted(() => {
  dispose?.();
});
</script>

<style scoped>
.lc-ghost-group {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
}

.lc-ghost {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  margin: 4px;
  border-radius: 4px;
}
</style>
```

---

## 🎯 里程碑与验收

| 阶段 | 里程碑 | 验收标准 | 完成时间 |
|------|--------|----------|----------|
| 1 | Dragon 类框架 | 可实例化，状态管理正常 | Week 1 |
| 2 | 拖拽启动 | 可启动拖拽，支持取消 | Week 1-2 |
| 3 | Sensor 系统 | Sensor 可注册、选择 | Week 2 |
| 4 | 坐标转换 | 坐标准确，支持 iframe | Week 2-3 |
| 5 | 投放定位 | 位置计算正确 | Week 3 |
| 6 | UI 组件 | 视觉一致，交互流畅 | Week 3-4 |
| 7 | 高级功能 | RGL、特殊节点 | Week 4-5 |
| 8 | 测试完成 | 覆盖率 > 80% | Week 5-6 |

---

## ⚠️ 风险与应对

### 风险 1：工作量超出预期
**应对**：
- 优先实现核心功能（阶段 1-5）
- RGL 等高级功能可延后或移除
- 定期 Code Review 及时调整

### 风险 2：性能问题
**应对**：
- 早期建立性能基准
- 使用 Chrome DevTools 性能分析
- 关键路径使用 requestAnimationFrame

### 风险 3：跨浏览器兼容性
**应对**：
- 使用标准 DOM API
- 避免使用实验性特性
- 早期进行跨浏览器测试

### 风险 4：iframe 坐标转换复杂
**应对**：
- 充分测试各种嵌套场景
- 参考原版实现
- 必要时简化为单 Simulator

---

## 📚 参考资源

### 代码参考
- 原版 Dragon: `packages/designer/src/designer/dragon.ts`
- 原版 Sensor: `packages/designer/src/builtin-simulator/host.ts`
- 原版 DragGhost: `packages/designer/src/designer/drag-ghost/index.tsx`

### 技术文档
- Vue 3 官方文档: https://vuejs.org/
- TypeScript 手册: https://www.typescriptlang.org/docs/
- LowCode 引擎文档: https://lowcode-engine.cn/docV2

### 类似项目
- vue-grid-layout: https://github.com/jbokjs/vue-grid-layout
- vue-draggable-plus: https://github.com/alfred-skyboard/vue-draggable-plus

---

## 👥 团队协作

### 角色分工
- **架构师**：设计接口、Review 代码
- **前端开发**：实现各阶段功能
- **测试工程师**：编写测试用例、质量把控

### 沟通机制
- 每日站会：同步进度、阻塞问题
- 周例会：演示成果、调整计划
- Code Review：所有代码需 Review 后合并

---

## 📝 后续计划

完成迁移后：
1. **性能优化**：基于真实使用场景优化
2. **文档完善**：API 文档、使用示例
3. **社区推广**：技术博客、开源分享
4. **持续维护**：Bug 修复、功能迭代

---

**文档版本**: v1.0
**创建时间**: 2026-01-07
**最后更新**: 2026-01-07
**维护人**: LowCode Team
