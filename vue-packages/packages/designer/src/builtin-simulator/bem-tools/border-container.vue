<template>
  <div v-if="rect" class="lc-borders lc-borders-detecting" :style="style">
    <Title :title="title" class="lc-borders-title" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { IPublicTypeI18nData, IPublicTypeTitleContent } from '@alilc/lowcode-types';
import { isI18nData } from '@alilc/lowcode-utils';
import { Title } from '@alilc/lowcode-editor-core';

export default defineComponent({
  name: 'BorderContainerInstance',
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
    };
  },
});

function getTitle(title: string | IPublicTypeI18nData): string {
  if (typeof title === 'string') return title;
  if (isI18nData(title)) {
    // TODO: 获取 locale
    const locale = 'zh-CN';
    return `将放入到此${title[locale]}`;
  }
  return '';
}
</script>
