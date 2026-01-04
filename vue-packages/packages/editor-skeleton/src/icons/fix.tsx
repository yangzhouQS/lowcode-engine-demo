import { defineComponent, h } from 'vue';

export const FixIcon = defineComponent({
  name: 'FixIcon',
  setup() {
    return () => {
      return h('svg', {
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        width: '1em',
        height: '1em',
      }, [
        h('path', {
          d: 'M22.7 19l-9.1-9.1c.9-2.3.9-5-2.5-6.9l-2.8-2.8c-.8-.8-2.1-.8-2.8 0L5 2.5c-.8-.8-2.1-.8-2.8 0L2.5 5c-.8.8-.8 2.1 0 2.8l2.8 2.8c1.9 1.9 4.6 1.9 6.9 2.5l9.1 9.1c.4.4 1.1 1.1 0 1.5-.4l.8-.8c.4-.4.4-1.1 0-1.5zM5.3 4.2l1.4-1.4 2.1 2.1-1.4 1.4-2.1-2.1zm12.4 12.4l-1.4 1.4-2.1-2.1 1.4-1.4 2.1 2.1z',
        }),
      ]);
    };
  },
});

export default FixIcon;
