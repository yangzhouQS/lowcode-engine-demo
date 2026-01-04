import { defineComponent, h, ref, onMounted, onUnmounted } from 'vue';

export interface PopupProps {
  visible?: boolean;
  onClose?: () => void;
  children?: any;
}

export const PopupView = defineComponent({
  name: 'PopupView',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    onClose: Function,
  },
  setup(props, { slots }) {
    const popupRef = ref<HTMLElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.value && !popupRef.value.contains(event.target as Node)) {
        props.onClose?.();
      }
    };

    onMounted(() => {
      if (props.visible) {
        document.addEventListener('mousedown', handleClickOutside);
      }
    });

    onUnmounted(() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });

    return () => {
      if (!props.visible) {
        return null;
      }

      return h('div', {
        ref: popupRef,
        class: 'lc-popup',
        style: {
          position: 'fixed',
          zIndex: 1000,
        },
      }, [
        slots.default ? slots.default() : null,
      ]);
    };
  },
});

export default PopupView;
