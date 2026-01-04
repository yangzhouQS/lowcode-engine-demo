<template>
  <div v-if="edge" :class="className" :style="style" />
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { IPublicTypeRect } from '@alilc/lowcode-types';

interface InsertionData {
  edge?: DOMRect;
  insertType?: string;
  vertical?: boolean;
  nearRect?: IPublicTypeRect;
  coverRect?: DOMRect;
  nearNode?: any;
}

export default defineComponent({
  name: 'InsertionView',
  props: {
    host: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    const loc = computed(() => props.host.currentDocument?.dropLocation);

    const insertionData = computed(() => {
      const location = loc.value;
      if (!location) {
        return {} as InsertionData;
      }
      // 如果是个绝对定位容器，不需要渲染插入标记
      if (location.target?.componentMeta?.advanced.isAbsoluteLayoutContainer) {
        return {} as InsertionData;
      }
      return processDetail(location);
    });

    const { edge, insertType, coverRect, nearRect, vertical, nearNode } = insertionData.value;

    const className = computed(() => {
      let cn = 'lc-insertion';
      if ((loc.value?.detail as any)?.valid === false) {
        cn += ' invalid';
      }
      if (insertType === 'cover') {
        cn += ' cover';
      }
      if (vertical) {
        cn += ' vertical';
      }
      return cn;
    });

    const style = computed(() => {
      const data = insertionData.value;
      if (!data.edge) {
        return {};
      }

      const { scale, scrollX, scrollY } = props.host.viewport;
      const { edge, insertType, coverRect, nearRect, vertical, nearNode } = data;

      const s: any = {};
      let x: number;
      let y: number;
      if (insertType === 'cover') {
        x = (coverRect!.left + scrollX) * scale;
        y = (coverRect!.top + scrollY) * scale;
        s.width = coverRect!.width * scale;
        s.height = coverRect!.height * scale;
      } else {
        if (!nearRect) {
          return {};
        }
        if (vertical) {
          x = ((insertType === 'before' ? nearRect.left : nearRect.right) + scrollX) * scale;
          y = (nearRect.top + scrollY) * scale;
          s.height = nearRect!.height * scale;
        } else {
          x = (nearRect.left + scrollX) * scale;
          y = ((insertType === 'before' ? nearRect.top : nearRect.bottom) + scrollY) * scale;
          s.width = nearRect.width * scale;
        }
        if (y === 0 && (nearNode as any)?.componentMeta?.isTopFixed) {
          return {};
        }
      }
      s.transform = `translate3d(${x}px, ${y}px, 0)`;

      return s;
    });

    return {
      className,
      style,
    };
  },
});

/**
 * 处理拖拽子节点(INode)情况
 */
function processChildrenDetail(sim: any, container: any, detail: any): InsertionData {
  let edge = detail.edge || null;

  if (!edge) {
    edge = sim.computeRect(container);
    if (!edge) {
      return {};
    }
  }

  const ret: any = {
    edge,
    insertType: 'before',
  };

  if (detail.near) {
    const { node, pos, rect, align } = detail.near;
    ret.nearRect = rect || sim.computeRect(node);
    ret.nearNode = node;
    if (pos === 'replace') {
      // FIXME: ret.nearRect mybe null
      ret.coverRect = ret.nearRect;
      ret.insertType = 'cover';
    } else if (!ret.nearRect || (ret.nearRect.width === 0 && ret.nearRect.height === 0)) {
      ret.nearRect = ret.edge;
      ret.insertType = 'after';
      ret.vertical = isVertical(ret.nearRect);
    } else {
      ret.insertType = pos;
      ret.vertical = align ? align === 'V' : isVertical(ret.nearRect);
    }
    return ret;
  }

  // from outline-tree: has index, but no near
  // TODO: think of shadowNode & ConditionFlow
  const { index } = detail;
  if (index == null) {
    ret.coverRect = ret.edge;
    ret.insertType = 'cover';
    return ret;
  }
  let nearNode = container.children.get(index);
  if (!nearNode) {
    // index = 0, eg. nochild,
    nearNode = container.children.get(index > 0 ? index - 1 : 0);
    if (!nearNode) {
      ret.insertType = 'cover';
      ret.coverRect = edge;
      return ret;
    }
    ret.insertType = 'after';
  }
  if (nearNode) {
    ret.nearRect = sim.computeRect(nearNode);
    if (!ret.nearRect || (ret.nearRect.width === 0 && ret.nearRect.height === 0)) {
      ret.nearRect = ret.edge;
      ret.insertType = 'after';
    }
    ret.vertical = isVertical(ret.nearRect);
    ret.nearNode = nearNode;
  } else {
    ret.insertType = 'cover';
    ret.coverRect = edge;
  }
  return ret;
}

/**
 * 将 detail 信息转换为页面"坐标"信息
 */
function processDetail({ target, detail, document }: any): InsertionData {
  const sim = document.simulator;
  if (!sim) {
    return {};
  }
  if (isLocationChildrenDetail(detail)) {
    return processChildrenDetail(sim, target, detail);
  } else {
    // TODO: others...
    const instances = sim.getComponentInstances(target);
    if (!instances) {
      return {};
    }
    const edge = sim.computeComponentInstanceRect(instances[0], target.componentMeta.rootSelector);
    return edge ? { edge, insertType: 'cover', coverRect: edge } : {};
  }
}

function isLocationChildrenDetail(detail: any): boolean {
  return detail && typeof detail === 'object' && ('near' in detail || 'index' in detail);
}

function isVertical(rect: any): boolean {
  return rect && rect.height > rect.width;
}
</script>
