<template>
  <div class="lc-project">
    <div class="lc-simulator-shell">
      <Loading v-if="!project?.simulator?.renderer" />
      <component :is="Simulator" v-bind="simulatorProps" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, markRaw, onMounted, PropType } from 'vue';
import { observer, engineConfig } from '@alilc/lowcode-editor-core';
import { Designer } from '../designer';
import { BuiltinSimulatorHostView } from '../builtin-simulator';
import './project.less';

const BuiltinLoading = defineComponent({
  name: 'BuiltinLoading',
  setup() {
    return () => (
      <div id="engine-loading-wrapper">
        <img width="154" height="100" src="https://img.alicdn.com/tfs/TB1CmVgayERMeJjy0FcXXc7opXa-308-200.gif" />
      </div>
    );
  },
});

export default defineComponent({
  name: 'ProjectView',
  components: {
    BuiltinLoading,
  },
  props: {
    designer: {
      type: Object as PropType<Designer>,
      required: true,
    },
  },
  setup(props) {
    const simulatorProps = computed(() => props.designer.projectSimulatorProps);
    const Simulator = computed(() => {
      return markRaw(props.designer.simulatorComponent || BuiltinSimulatorHostView);
    });
    const Loading = computed(() => {
      return engineConfig.get('loadingComponent', BuiltinLoading);
    });
    const project = computed(() => props.designer.project);

    onMounted(() => {
      const { designer } = props;
      const { project } = designer;

      project.onRendererReady(() => {
        // Force update is not needed in Vue 3 as computed properties are reactive
      });
    });

    return {
      simulatorProps,
      Simulator,
      Loading,
      project,
    };
  },
});
</script>
