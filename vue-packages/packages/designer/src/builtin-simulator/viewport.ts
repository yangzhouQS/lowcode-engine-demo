import { defineComponent, ref, onMounted, onUnmounted, computed, watch, inject, h } from 'vue';
import { useSimulatorContext } from './context';
import { BuiltinSimulatorHost } from './host';

export interface ViewportProps {
  style?: Record<string, any>;
  className?: string;
  scrollLeft?: number;
  scrollTop?: number;
}

export const Viewport = defineComponent({
  name: 'Viewport',
  props: {
    style: {
      type: Object as () => Record<string, any>,
      default: () => ({}),
    },
    className: {
      type: String,
      default: '',
    },
    scrollLeft: {
      type: Number,
      default: 0,
    },
    scrollTop: {
      type: Number,
      default: 0,
    },
  },
  setup(props: ViewportProps, { slots, emit }) {
    const simulator = inject<BuiltinSimulatorHost>('simulator');
    const viewportRef = ref<HTMLElement | null>(null);

    // 计算视口样式
    const viewportStyle = computed(() => ({
      ...props.style,
      overflow: 'auto',
      position: 'relative',
      width: '100%',
      height: '100%',
    }));

    // 处理滚动事件
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      emit('scroll', {
        scrollLeft: target.scrollLeft,
        scrollTop: target.scrollTop,
      });
    };

    // 更新滚动位置
    watch(() => props.scrollLeft, (newVal) => {
      if (viewportRef.value) {
        viewportRef.value.scrollLeft = newVal;
      }
    });

    watch(() => props.scrollTop, (newVal) => {
      if (viewportRef.value) {
        viewportRef.value.scrollTop = newVal;
      }
    });

    // 滚动到指定位置
    const scrollTo = (options: { left?: number; top?: number; behavior?: ScrollBehavior }) => {
      if (viewportRef.value) {
        viewportRef.value.scrollTo(options);
      }
    };

    // 滚动到元素
    const scrollToElement = (element: HTMLElement, options?: ScrollIntoViewOptions) => {
      element.scrollIntoView(options);
    };

    // 获取滚动位置
    const getScrollPosition = () => {
      if (!viewportRef.value) {
        return { left: 0, top: 0 };
      }
      return {
        left: viewportRef.value.scrollLeft,
        top: viewportRef.value.scrollTop,
      };
    };

    // 获取视口尺寸
    const getViewportSize = () => {
      if (!viewportRef.value) {
        return { width: 0, height: 0 };
      }
      return {
        width: viewportRef.value.clientWidth,
        height: viewportRef.value.clientHeight,
      };
    };

    // 暴露方法
    const exposeMethods = () => {
      if (simulator) {
        simulator.viewport = {
          scrollTo,
          scrollToElement,
          getScrollPosition,
          getViewportSize,
        };
      }
    };

    onMounted(() => {
      exposeMethods();
    });

    return () => {
      return h('div', {
        ref: viewportRef,
        class: `lc-viewport ${props.className}`,
        style: viewportStyle.value,
        onScroll: handleScroll,
      }, slots.default ? slots.default() : undefined);
    };
  },
});

export default Viewport;
