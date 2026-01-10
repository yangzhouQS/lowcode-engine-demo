<template>
  <div
    v-if="shouldShowGhost"
    class="lc-ghost-group"
    :style="{ left: `${x}px`, top: `${y}px` }"
  >
    <div v-for="(title, i) in titles" :key="i" class="lc-ghost">
      <div class="lc-ghost-title">{{ renderTitle(title) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { Designer } from '../designer/Designer';
import { isDragNodeObject, isDragNodeDataObject, type ILocateEvent } from './Dragon';
import type {
  IPublicTypeDragNodeObject,
  IPublicTypeDragNodeDataObject,
  IPublicTypeI18nData,
  ISchema,
  IPublicModelDragObject
} from '@vue3-lowcode/types';
import './ghost.css';

/**
 * DragGhost 组件属性
 */
interface DragGhostProps {
  designer: Designer;
}

const props = defineProps<DragGhostProps>();

/**
 * 拖拽标题列表
 */
const titles = ref<(string | IPublicTypeI18nData)[]>([]);

/**
 * 拖拽位置 X
 */
const x = ref(0);

/**
 * 拖拽位置 Y
 */
const y = ref(0);

/**
 * 是否为绝对布局容器
 */
const isAbsoluteLayoutContainer = ref(false);

/**
 * Dragon 实例
 */
const dragon = props.designer.getDragon();

/**
 * 清理函数列表
 */
const disposables: Array<() => void> = [];

/**
 * 判断是否显示幽灵元素
 */
const shouldShowGhost = computed(() => {
  return titles.value.length > 0 && !isAbsoluteLayoutContainer.value;
});

/**
 * 渲染标题
 */
function renderTitle(title: string | IPublicTypeI18nData): string {
  if (typeof title === 'string') {
    return title;
  }

  // 处理国际化数据
  if (title.en_US) {
    return title.en_US;
  }

  if (title.zh_CN) {
    return title.zh_CN;
  }

  return String(title);
}

/**
 * 获取拖拽对象的标题列表
 */
function getTitles(dragObject: IPublicModelDragObject): (string | IPublicTypeI18nData)[] {
  if (isDragNodeObject(dragObject)) {
    return dragObject.nodes.map((node) => node.title);
  }

  if (isDragNodeDataObject(dragObject)) {
    // 从节点数据获取标题
    const dataList = Array.isArray(dragObject.data) ? dragObject.data : [dragObject.data];

    return dataList.map((item: ISchema) => {
      // 简化处理：直接使用组件名称作为标题
      // TODO: 如果需要获取组件元数据，需要通过 documentModel 或 simulator 获取
      return item.componentName;
    });
  }

  // 对于其他类型的拖拽对象，返回空数组
  return [];
}

/**
 * 组件挂载时监听拖拽事件
 */
onMounted(() => {
  // 监听拖拽开始
  const dragstartDisposable = dragon.onDragstart((e: ILocateEvent) => {
    // 忽略原生拖拽 API
    if (e.originalEvent.type.slice(0, 4) === 'drag') {
      return;
    }

    titles.value = getTitles(e.dragObject);
    x.value = e.globalX;
    y.value = e.globalY;
  });
  disposables.push(() => dragstartDisposable.dispose());

  // 监听拖拽进行
  const dragDisposable = dragon.onDrag((e: ILocateEvent) => {
    x.value = e.globalX;
    y.value = e.globalY;

    // 检查是否为绝对布局容器
    if (e.sensor) {
      const container = e.sensor.getDropContainer?.(e);
      if (container?.container.componentMeta?.advanced?.isAbsoluteLayoutContainer) {
        isAbsoluteLayoutContainer.value = true;
        return;
      }
    }

    isAbsoluteLayoutContainer.value = false;
  });
  disposables.push(() => dragDisposable.dispose());

  // 监听拖拽结束
  const dragendDisposable = dragon.onDragend(() => {
    titles.value = [];
    x.value = 0;
    y.value = 0;
    isAbsoluteLayoutContainer.value = false;
  });
  disposables.push(() => dragendDisposable.dispose());
});

/**
 * 组件卸载时清理事件监听
 */
onUnmounted(() => {
  disposables.forEach((dispose) => dispose());
});
</script>

<style scoped>
.lc-ghost-group {
  box-sizing: border-box;
  position: fixed;
  z-index: 99999;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  background-color: var(--color-block-background-deep-dark, rgba(0, 0, 0, 0.4));
  box-shadow: 0 0 6px var(--color-block-background-shallow, grey);
  transform: translate(-10%, -50%);
}

.lc-ghost {
  width: 100%;
}

.lc-ghost-title {
  text-align: center;
  font-size: var(--font-size-text, 12px);
  text-overflow: ellipsis;
  color: var(--color-text-light, #fff);
  white-space: nowrap;
  overflow: hidden;
  padding: 4px 8px;
}
</style>
