<template>
  <div v-if="titles && titles.length" class="lc-ghost-group" :style="style">
    <div v-for="(title, i) in titles" :key="i" class="lc-ghost">
      <Title :title="title" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted, PropType, computed, VNode } from 'vue';
import { observer, Title, makeObservable } from '@alilc/lowcode-editor-core';
import { Designer } from '../designer';
import { isDragNodeObject } from '../dragon';
import { isSimulatorHost } from '../../simulator';
import { IPublicTypeI18nData, IPublicTypeNodeSchema, IPublicModelDragObject } from '@alilc/lowcode-types';
import './ghost.less';

type offBinding = () => any;

export default defineComponent({
  name: 'DragGhost',
  components: {
    Title,
  },
  props: {
    designer: {
      type: Object as PropType<Designer>,
      required: true,
    },
  },
  setup(props) {
    const dispose = ref<offBinding[]>([]);
    const titles = ref<(string | IPublicTypeI18nData | VNode)[] | null>(null);
    const x = ref(0);
    const y = ref(0);
    const isAbsoluteLayoutContainer = ref(false);

    const dragon = computed(() => props.designer.dragon);

    const getTitles = (dragObject: IPublicModelDragObject) => {
      if (isDragNodeObject(dragObject)) {
        return dragObject.nodes.map((node) => node.title);
      }

      const dataList = Array.isArray(dragObject.data) ? dragObject.data : [dragObject.data];

      return dataList.map((item: IPublicTypeNodeSchema, i) => (props.designer.getComponentMeta(item.componentName).title));
    };

    const renderGhostGroup = () => {
      return titles.value?.map((title, i) => {
        return (
          <div class="lc-ghost" key={i}>
            <Title title={title} />
          </div>
        );
      });
    };

    makeObservable({
      titles,
      x,
      y,
      isAbsoluteLayoutContainer,
    });

    const dragStart = (e: any) => {
      if (e.originalEvent.type.slice(0, 4) === 'drag') {
        return;
      }
      titles.value = getTitles(e.dragObject);
      x.value = e.globalX;
      y.value = e.globalY;
    };

    const drag = (e: any) => {
      x.value = e.globalX;
      y.value = e.globalY;
      if (isSimulatorHost(e.sensor)) {
        const container = e.sensor.getDropContainer(e);
        if (container?.container.componentMeta.advanced.isAbsoluteLayoutContainer) {
          isAbsoluteLayoutContainer.value = true;
          return;
        }
      }
      isAbsoluteLayoutContainer.value = false;
    };

    const dragEnd = () => {
      titles.value = null;
      x.value = 0;
      y.value = 0;
    };

    onMounted(() => {
      const drag = dragon.value;
      const unbind = drag.onDragstart(dragStart);
      const unbindDrag = drag.onDrag(drag);
      const unbindEnd = drag.onDragend(dragEnd);

      dispose.value = [unbind, unbindDrag, unbindEnd];
    });

    onUnmounted(() => {
      if (dispose.value) {
        dispose.value.forEach(off => off());
      }
    });

    const style = computed(() => {
      return {
        left: x.value,
        top: y.value,
      };
    });

    return {
      titles,
      style,
    };
  },
});
</script>
