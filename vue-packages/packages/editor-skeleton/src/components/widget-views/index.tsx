import { defineComponent, h, computed } from 'vue';
import { IWidget } from '../../widget/widget';
import { useSkeleton } from '../../context';

export const WidgetView = defineComponent({
  name: 'WidgetView',
  props: {
    widget: {
      type: Object as () => IWidget,
      required: true,
    },
  },
  setup(props) {
    const skeleton = useSkeleton();

    const handleClick = () => {
      if (props.widget.disabled) {
        return;
      }
      props.widget.toggle();
    };

    const style = computed(() => ({
      display: props.widget.visible ? 'block' : 'none',
      opacity: props.widget.disabled ? 0.5 : 1,
      cursor: props.widget.disabled ? 'not-allowed' : 'pointer',
    }));

    return () => {
      return h('div', {
        class: 'lc-widget',
        style: style.value,
        onClick: handleClick,
      }, [
        props.widget.body,
      ]);
    };
  },
});

export default WidgetView;
