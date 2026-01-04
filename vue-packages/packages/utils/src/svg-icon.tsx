/**
 * Vue3 LowCode Engine - Utils Package
 * SVG图标相关工具
 */

import { defineComponent, h } from 'vue';

export interface SVGIconProps {
  name: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
  style?: Record<string, any>;
}

export const SVGIcon = defineComponent({
  name: 'SVGIcon',
  props: {
    name: String,
    width: [Number, String],
    height: [Number, String],
    fill: String,
    className: String,
    style: Object,
  },
  setup(props: SVGIconProps) {
    return () => {
      return h('svg', {
        class: props.className,
        style: {
          width: props.width ? (typeof props.width === 'number' ? `${props.width}px` : props.width) : '1em',
          height: props.height ? (typeof props.height === 'number' ? `${props.height}px` : props.height) : '1em',
          fill: props.fill || 'currentColor',
          ...props.style,
        },
        viewBox: '0 0 1024 1024',
        'aria-hidden': 'true',
      }, [
        h('use', {
          href: `#${props.name}`,
        }),
      ]);
    };
  },
});
