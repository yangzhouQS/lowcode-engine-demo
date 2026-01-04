<template>
  <div
    v-if="observed.hasOffset"
    class="lc-borders lc-borders-selecting"
    :class="{ highlight, dragging }"
    :style="style"
  >
    <Toolbar v-if="!dragging && !hideComponentAction" :observed="observed" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { engineConfig } from '@alilc/lowcode-editor-core';
import { OffsetObserver } from '../../designer';
import Toolbar from './toolbar.vue';

export default defineComponent({
  name: 'BorderSelectingInstance',
  components: {
    Toolbar,
  },
  props: {
    observed: {
      type: Object as PropType<OffsetObserver>,
      required: true,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
    dragging: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const hideComponentAction = computed(() => engineConfig.get('hideComponentAction'));

    const style = computed(() => {
      if (!props.observed.hasOffset) return {};
      const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = props.observed;
      return {
        width: `${offsetWidth}px`,
        height: `${offsetHeight}px`,
        transform: `translate3d(${offsetLeft}px, ${offsetTop}px, 0)`,
      };
    });

    const hideSelectTools = computed(() => props.observed.node.componentMeta.advanced.hideSelectTools);

    return {
      style,
      hideComponentAction,
      hideSelectTools,
    };
  },
});
</script>
