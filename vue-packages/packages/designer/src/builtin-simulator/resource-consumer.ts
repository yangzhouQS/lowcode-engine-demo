import { defineComponent, inject, h, VNode } from 'vue';
import { useSimulatorContext } from './context';

export const ResourceConsumer = defineComponent({
  name: 'ResourceConsumer',
  setup(props, { slots }) {
    const simulator = useSimulatorContext();

    return () => {
      if (!simulator) {
        return slots.default ? slots.default() : null;
      }

      // 获取当前资源
      const resource = simulator.currentResource;
      
      // 如果有资源，渲染资源内容
      if (resource && resource.component) {
        return h(resource.component, {
          ...resource.props,
        }, slots.default ? slots.default() : undefined);
      }

      // 否则渲染默认内容
      return slots.default ? slots.default() : null;
    };
  },
});

export default ResourceConsumer;
