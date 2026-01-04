import { defineComponent, h } from 'vue';

export const SlotIcon = defineComponent({
  name: 'SlotIcon',
  setup() {
    return () => {
      return h('svg', {
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        width: '1em',
        height: '1em',
      }, [
        h('path', {
          d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
        }),
        h('path', {
          d: 'M7 7h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM7 15h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z',
        }),
      ]);
    };
  },
});

export default SlotIcon;
