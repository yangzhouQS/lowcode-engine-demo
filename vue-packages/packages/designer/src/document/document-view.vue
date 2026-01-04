<template>
  <div :class="['lc-document', { 'lc-document-hidden': document.suspensed }]">
    <div class="lc-simulator-shell">
      <component :is="Simulator" v-bind="simulatorProps" />
    </div>
    <DocumentInfoView :document="document" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, markRaw, PropType } from 'vue';
import { observer } from '@alilc/lowcode-editor-core';
import { IDocumentModel } from './document-model';
import { BuiltinSimulatorHostView } from '../builtin-simulator';

const DocumentInfoView = defineComponent({
  name: 'DocumentInfoView',
  props: {
    document: {
      type: Object as PropType<IDocumentModel>,
      required: true,
    },
  },
  setup() {
    return () => null;
  },
});

export default defineComponent({
  name: 'DocumentView',
  components: {
    DocumentInfoView,
  },
  props: {
    document: {
      type: Object as PropType<IDocumentModel>,
      required: true,
    },
  },
  setup(props) {
    const simulatorProps = computed(() => props.document.simulatorProps);
    const Simulator = computed(() => {
      return markRaw(props.document.designer.simulatorComponent || BuiltinSimulatorHostView);
    });

    return {
      simulatorProps,
      Simulator,
    };
  },
});
</script>
