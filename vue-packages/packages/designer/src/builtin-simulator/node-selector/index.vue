<template>
  <div class="instance-node-selector">
    <Popup
      :trigger="currentNodeTrigger"
      trigger-type="hover"
      :offset="[0, 0]"
    >
      <div class="instance-node-selector">
        <div v-if="parentNodes && parentNodes.length >= 1" class="instance-node-selector-list">
          <div
            v-for="(node, key) in parentNodes"
            :key="key"
            class="instance-node-selector-node"
            @click="handleSelect(node)"
            @mouseenter="handleMouseOver(node)"
            @mouseleave="handleMouseOut(node)"
          >
            <div class="instance-node-selector-node-content">
              <Title
                class="instance-node-selector-node-title"
                :title="{
                  label: node.title,
                  icon: node.icon,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue';
import { Title } from '@alilc/lowcode-editor-core';
import { canClickNode } from '@alilc/lowcode-utils';
import { INode } from '@alilc/lowcode-designer';
import './index.less';

type UnionNode = INode | null;

export default defineComponent({
  name: 'NodeSelector',
  components: {
    Title,
  },
  props: {
    node: {
      type: Object as PropType<INode>,
      required: true,
    },
  },
  setup(props) {
    const parentNodes = ref<INode[]>([]);

    onMounted(() => {
      const nodes = getParentNodes(props.node);
      parentNodes.value = nodes ?? [];
    });

    // 获取节点的父级节点（最多获取 5 层）
    const getParentNodes = (node: INode) => {
      const nodes: any[] = [];
      const focusNode = node.document?.focusNode;

      if (!focusNode) {
        return null;
      }

      if (node.contains(focusNode) || !focusNode.contains(node)) {
        return nodes;
      }

      let currentNode: UnionNode = node;

      while (currentNode && nodes.length < 5) {
        currentNode = currentNode.getParent();
        if (currentNode) {
          nodes.push(currentNode);
        }
        if (currentNode === focusNode) {
          break;
        }
      }
      return nodes;
    };

    const handleSelect = (node: INode) => (event: MouseEvent) => {
      if (!node) {
        return;
      }

      const canClick = canClickNode(node.internalToShellNode()!, event);

      if (canClick && typeof node.select === 'function') {
        node.select();
        const editor = node.document?.designer.editor;
        const npm = node?.componentMeta?.npm;
        const selected =
          [npm?.package, npm?.componentName].filter((item) => !!item).join('-') ||
          node?.componentMeta?.componentName ||
          '';
        editor?.eventBus.emit('designer.border.action', {
          name: 'select',
          selected,
        });
      }
    };

    const handleMouseOver = (node: INode) => (_: any, flag = true) => {
      if (node && typeof node.hover === 'function') {
        node.hover(flag);
      }
    };

    const handleMouseOut = (node: INode) => (_: any, flag = false) => {
      if (node && typeof node.hover === 'function') {
        node.hover(flag);
      }
    };

    const currentNodeTrigger = () => (
      <div class="instance-node-selector-current">
        <Title
          class="instance-node-selector-node-title"
          :title="{
            label: props.node.title,
            icon: props.node.icon,
          }"
        />
      </div>
    );

    return {
      parentNodes,
      handleSelect,
      handleMouseOver,
      handleMouseOut,
      currentNodeTrigger,
    };
  },
});
</script>
