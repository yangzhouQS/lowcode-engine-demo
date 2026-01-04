<template>
  <div v-if="rect" class="lc-borders lc-borders-detecting" :style="style">
    <Title :title="title" class="lc-borders-title" />
    <Title v-if="isLocked" :title="intl('locked')" class="lc-borders-status" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { IPublicTypeTitleContent } from '@alilc/lowcode-types';
import { Title } from '@alilc/lowcode-editor-core';
import { intl } from '../../locale';

export default defineComponent({
  name: 'BorderDetectingInstance',
  components: {
    Title,
  },
  props: {
    title: {
      type: [String, Object] as PropType<IPublicTypeTitleContent>,
      required: true,
    },
    rect: {
      type: Object as PropType<DOMRect | null>,
      default: null,
    },
    scale: {
      type: Number,
      required: true,
    },
    scrollX: {
      type: Number,
      required: true,
    },
    scrollY: {
      type: Number,
      required: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const style = computed(() => {
      if (!props.rect) return {};
      return {
        width: `${props.rect.width * props.scale}px`,
        height: `${props.rect.height * props.scale}px`,
        transform: `translate(${(props.scrollX + props.rect.left) * props.scale}px, ${(props.scrollY + props.rect.top) * props.scale}px)`,
      };
    });

    return {
      style,
      intl,
    };
  },
});
</script>
