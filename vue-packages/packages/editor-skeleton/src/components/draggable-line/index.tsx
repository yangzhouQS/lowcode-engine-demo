import { defineComponent, h, ref, onMounted, onUnmounted } from 'vue';

export interface DraggableLineProps {
  direction?: 'horizontal' | 'vertical';
  position?: number;
  onDrag?: (position: number) => void;
  onDragEnd?: (position: number) => void;
}

export const DraggableLine = defineComponent({
  name: 'DraggableLine',
  props: {
    direction: {
      type: String as () => 'horizontal' | 'vertical',
      default: 'horizontal',
    },
    position: {
      type: Number,
      default: 0,
    },
    onDrag: Function,
    onDragEnd: Function,
  },
  setup(props) {
    const isDragging = ref(false);
    const lineRef = ref<HTMLElement | null>(null);
    const startPos = ref(0);
    const startMousePos = ref(0);

    const handleMouseDown = (event: MouseEvent) => {
      isDragging.value = true;
      startPos.value = props.position;
      startMousePos.value = props.direction === 'horizontal' ? event.clientY : event.clientX;
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging.value) return;
      
      const delta = props.direction === 'horizontal' 
        ? event.clientY - startMousePos.value
        : event.clientX - startMousePos.value;
      
      const newPosition = startPos.value + delta;
      props.onDrag?.(newPosition);
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (!isDragging.value) return;
      
      const delta = props.direction === 'horizontal' 
        ? event.clientY - startMousePos.value
        : event.clientX - startMousePos.value;
      
      const newPosition = startPos.value + delta;
      props.onDragEnd?.(newPosition);
      
      isDragging.value = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    onUnmounted(() => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    });

    const style = {
      position: 'absolute',
      backgroundColor: '#1890ff',
      cursor: props.direction === 'horizontal' ? 'row-resize' : 'col-resize',
      zIndex: 1000,
      ...(props.direction === 'horizontal' 
        ? { height: '4px', width: '100%', top: `${props.position}px` }
        : { width: '4px', height: '100%', left: `${props.position}px` }
      ),
    };

    return () => {
      return h('div', {
        ref: lineRef,
        class: 'lc-draggable-line',
        style: style as any,
        onMousedown: handleMouseDown,
      });
    };
  },
});

export default DraggableLine;
