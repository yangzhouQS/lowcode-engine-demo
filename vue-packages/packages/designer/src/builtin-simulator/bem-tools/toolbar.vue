<template>
  <div v-if="!hideSelectTools" class="lc-borders-actions" :style="style">
    <div v-for="(action, index) in actions" :key="index" class="lc-borders-action" @click="handleActionClick(action)">
      <component :is="getIcon(action.icon)" v-if="action.icon" :node="node.internalToShellNode()" />
      <Tip>{{ action.title }}</Tip>
    </div>
    <NodeSelector :node="node" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, h, VNode } from 'vue';
import { Tip } from '@alilc/lowcode-editor-core';
import { createIcon, isReactComponent, isActionContentObject } from '@alilc/lowcode-utils';
import { IPublicTypeActionContentObject, IPublicTypeTitleContent } from '@alilc/lowcode-types';
import { INode } from '../../designer';
import NodeSelector from '../node-selector';

export default defineComponent({
  name: 'Toolbar',
  components: {
    Tip,
    NodeSelector,
  },
  props: {
    observed: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    const { height, width } = props.observed.viewport;
    const BAR_HEIGHT = 20;
    const MARGIN = 1;
    const BORDER = 2;
    const SPACE_HEIGHT = BAR_HEIGHT + MARGIN + BORDER;
    const SPACE_MINIMUM_WIDTH = 160; // magic number，大致是 toolbar 的宽度
    let style: any = {};
    // 计算 toolbar 的上/下位置
    if (props.observed.top > SPACE_HEIGHT) {
      style = {
        top: -SPACE_HEIGHT,
        height: BAR_HEIGHT,
      };
    } else if (props.observed.bottom + SPACE_HEIGHT < height) {
      style = {
        bottom: -SPACE_HEIGHT,
        height: BAR_HEIGHT,
      };
    } else {
      style = {
        height: BAR_HEIGHT,
        top: Math.max(MARGIN, MARGIN - props.observed.top),
      };
    }
    // 计算 toolbar 的左/右位置
    if (SPACE_MINIMUM_WIDTH > props.observed.left + props.observed.width) {
      style.left = Math.max(-BORDER, props.observed.left - width - BORDER);
    } else {
      style.right = Math.max(-BORDER, props.observed.right - width - BORDER);
      style.justifyContent = 'flex-start';
    }

    const { node } = props.observed;
    const hideSelectTools = computed(() => props.observed.node.componentMeta.advanced.hideSelectTools);

    const actions = computed(() => {
      const actions: any[] = [];
      node.componentMeta.availableActions.forEach((action: any) => {
        const { important = true, condition, content, name } = action;
        if (node.isSlot() && (name === 'copy' || name === 'remove')) {
          // FIXME: need this?
          return;
        }
        if (important && (typeof condition === 'function' ? condition(node) !== false : condition !== false)) {
          actions.push(createAction(content, name, node));
        }
      });
      return actions;
    });

    const getIcon = (icon: any) => {
      if (icon) {
        return createIcon(icon, { node: node.internalToShellNode() });
      }
      return null;
    };

    const handleActionClick = (action: any) => {
      if (action.action) {
        action.action(node.internalToShellNode()!);
        const editor = node.document?.designer.editor;
        const npm = node?.componentMeta?.npm;
        const selected =
          [npm?.package, npm?.componentName].filter((item) => !!item).join('-') ||
          node?.componentMeta?.componentName ||
          '';
        editor?.eventBus.emit('designer.border.action', {
          name: action.name,
          selected,
        });
      }
    };

    return {
      style,
      hideSelectTools,
      actions,
      getIcon,
      handleActionClick,
    };
  },
});

function createAction(content: any, key: string, node: INode) {
  if (isActionContentObject(content)) {
    const { action, title, icon } = content;
    return {
      name: key,
      action,
      title,
      icon,
    };
  }
  return null;
}
</script>
