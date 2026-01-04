import { defineComponent, h } from 'vue';

export const ConvertIcon = defineComponent({
  name: 'ConvertIcon',
  setup() {
    return () => {
      return h('svg', {
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        width: '1em',
        height: '1em',
      }, [
        h('path', {
          d: 'M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z',
        }),
      ]);
    };
  },
});

export default ConvertIcon;
