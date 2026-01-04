import { defineComponent, h } from 'vue';

export default function divFactory() {
  return defineComponent({
    name: 'Div',
    setup(props, { slots }) {
      return () => h('div', props, slots.default?.());
    },
  });
}
