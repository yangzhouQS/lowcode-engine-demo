import { defineComponent, h } from 'vue';

export const VariableIcon = defineComponent({
  name: 'VariableIcon',
  setup() {
    return () => {
      return h('svg', {
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        width: '1em',
        height: '1em',
      }, [
        h('path', {
          d: 'M14.5 12c0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5zM12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8 8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z',
        }),
      ]);
    };
  },
});

export default VariableIcon;
