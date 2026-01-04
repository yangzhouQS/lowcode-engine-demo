import { defineComponent, ref, onMounted, onUnmounted, provide, computed, watch, h } from 'vue';
import { BuiltinSimulatorHost } from './host';
import { provideSimulatorContext } from './context';
import { Viewport } from './viewport';
import { ResourceConsumer } from './resource-consumer';

export interface HostViewProps {
  host: BuiltinSimulatorHost;
  style?: Record<string, any>;
  className?: string;
}

export const HostView = defineComponent({
  name: 'HostView',
  props: {
    host: {
      type: Object as () => BuiltinSimulatorHost,
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
  setup(props: HostViewProps) {
    const containerRef = ref<HTMLElement | null>(null);

    // 提供模拟器上下文
    provideSimulatorContext(props.host);

    // 计算容器样式
    const containerStyle = computed(() => ({
      ...props.style,
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }));

    // 计算设备类名
    const deviceClassName = computed(() => {
      const classNames = ['lc-simulator'];
      if (props.host.deviceClassName) {
        classNames.push(props.host.deviceClassName);
      }
      if (props.host.designMode) {
        classNames.push(`lc-simulator-${props.host.designMode}`);
      }
      if (props.host.suspended) {
        classNames.push('lc-simulator-suspended');
      }
      if (props.className) {
        classNames.push(props.className);
      }
      return classNames.join(' ');
    });

    // 监听设备变化
    watch(() => props.host.device, (device) => {
      console.log('Device changed:', device);
    });

    // 监听设计模式变化
    watch(() => props.host.designMode, (designMode) => {
      console.log('Design mode changed:', designMode);
    });

    // 监听挂起状态变化
    watch(() => props.host.suspended, (suspended) => {
      console.log('Suspended changed:', suspended);
    });

    // 组件挂载
    onMounted(() => {
      console.log('HostView mounted');
    });

    // 组件卸载
    onUnmounted(() => {
      console.log('HostView unmounted');
    });

    return () => {
      return h('div', {
        ref: containerRef,
        class: deviceClassName.value,
        style: containerStyle.value,
      }, [
        h(Viewport, {
          style: {
            width: '100%',
            height: '100%',
          },
        }, {
          default: () => [
            h(ResourceConsumer, {}, {
              default: () => {
                // 渲染文档内容
                const document = props.host.document;
                if (!document) {
                  return null;
                }
                
                // 获取根节点
                const rootNode = document.rootNode;
                if (!rootNode) {
                  return null;
                }
                
                // 渲染根节点
                return h('div', {
                  class: 'lc-document',
                  style: {
                    width: '100%',
                    height: '100%',
                  },
                }, 'Document Content');
              },
            }),
          ],
        }),
      ]);
    };
  },
});

export default HostView;
