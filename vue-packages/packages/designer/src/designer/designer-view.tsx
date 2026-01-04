import { defineComponent, ref, onMounted, onUnmounted, computed, watch, provide, h } from 'vue';
import { Designer } from './designer';
import { BuiltinSimulatorHost } from '../builtin-simulator/host';
import { HostView } from '../builtin-simulator/host-view';

export interface DesignerViewProps {
  /**
   * 设计器实例
   */
  designer: Designer;
  
  /**
   * 样式
   */
  style?: Record<string, any>;
  
  /**
   * 类名
   */
  className?: string;
}

export const DesignerView = defineComponent({
  name: 'DesignerView',
  props: {
    designer: {
      type: Object as () => Designer,
      required: true,
    },
    style: {
      type: Object as () => Record<string, any>,
      default: () => ({}),
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props: DesignerViewProps) {
    const containerRef = ref<HTMLElement | null>(null);
    const simulatorRef = ref<BuiltinSimulatorHost | null>(null);

    // 提供设计器上下文
    provide('designer', props.designer);

    // 计算容器样式
    const containerStyle = computed(() => ({
      ...props.style,
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }));

    // 计算类名
    const containerClassName = computed(() => {
      const classNames = ['lc-designer'];
      if (props.designer.designMode) {
        classNames.push(`lc-designer-${props.designer.designMode}`);
      }
      if (props.designer.device) {
        classNames.push(`lc-designer-${props.designer.device}`);
      }
      if (props.className) {
        classNames.push(props.className);
      }
      return classNames.join(' ');
    });

    // 创建模拟器
    const createSimulator = () => {
      if (!props.designer.project) {
        return;
      }

      const simulator = new BuiltinSimulatorHost({
        project: props.designer.project,
        document: props.designer.project?.currentDocument || null,
        designer: props.designer,
        components: props.designer.components,
        libraryMap: props.designer.libraryMap,
        context: props.designer.context,
        i18n: props.designer.i18n,
        locale: props.designer.locale,
        global: props.designer.global,
        utils: props.designer.utils,
        constants: props.designer.constants,
        requestHandlersMap: props.designer.requestHandlersMap,
        setters: props.designer.setters,
        designMode: props.designer.designMode,
        device: props.designer.device,
        suspended: false,
      });

      simulatorRef.value = simulator;
      props.designer.setSimulator(simulator);
    };

    // 销毁模拟器
    const destroySimulator = () => {
      if (simulatorRef.value) {
        simulatorRef.value.dispose();
        simulatorRef.value = null;
      }
    };

    // 监听设计器变化
    watch(() => props.designer.project, (project) => {
      if (project) {
        destroySimulator();
        createSimulator();
      }
    });

    watch(() => props.designer.designMode, (designMode) => {
      if (simulatorRef.value) {
        simulatorRef.value.setDesignMode(designMode);
      }
    });

    watch(() => props.designer.device, (device) => {
      if (simulatorRef.value) {
        simulatorRef.value.setDevice(device);
      }
    });

    // 组件挂载
    onMounted(() => {
      createSimulator();
    });

    // 组件卸载
    onUnmounted(() => {
      destroySimulator();
    });

    return () => {
      if (!simulatorRef.value) {
        return h('div', {
          ref: containerRef,
          class: containerClassName.value,
          style: containerStyle.value,
        }, 'Loading...');
      }

      return h('div', {
        ref: containerRef,
        class: containerClassName.value,
        style: containerStyle.value,
      }, [
        h(HostView, {
          host: simulatorRef.value,
          style: {
            width: '100%',
            height: '100%',
          },
        }),
      ]);
    };
  },
});

export default DesignerView;
