import { defineComponent, h } from 'vue';

export const ArrowIcon = defineComponent({
  name: 'ArrowIcon',
  props: {
    direction: {
      type: String as () => 'up' | 'down' | 'left' | 'right',
      default: 'right',
    },
  },
  setup(props) {
    const getIconPath = () => {
      switch (props.direction) {
        case 'up':
          return 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z';
        case 'down':
          return 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z';
        case 'left':
          return 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z';
        case 'right':
        default:
          return 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z';
      }
    };

    return () => {
      return h('svg', {
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        width: '1em',
        height: '1em',
      }, [
        h('path', {
          d: getIconPath(),
        }),
      ]);
    };
  },
});

export default ArrowIcon;
