import { defineComponent } from 'vue';

const Leaf = defineComponent({
  name: 'Leaf',
  displayName: 'Leaf',
  componentMetadata: {
    componentName: 'Leaf',
    configure: {
      props: [
        {
          name: 'children',
          setter: 'StringSetter',
        }
      ],
      supports: false,
    },
  },
  setup(props, { slots }) {
    return () => {
      return slots.default ? slots.default() : props.children;
    };
  },
});

export default Leaf;
