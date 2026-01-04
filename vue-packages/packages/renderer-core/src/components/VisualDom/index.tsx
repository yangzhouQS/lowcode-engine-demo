import { defineComponent, h } from 'vue';

export default function visualDomFactory() {
  return defineComponent({
    name: 'VisualDom',
    props: {
      __componentName: String,
    },
    setup(props, { slots }) {
      return () => h('div', {
        class: 'lce-visual-dom',
        'data-component-name': props.__componentName,
      }, slots.default?.());
    },
  });
}
