import { defineComponent, h, computed } from 'vue';
import { useSkeleton } from '../../context';
import { IStage } from '../../widget/stage';

export interface StageBoxProps {
  stage: IStage;
  children?: any;
}

export const StageBox = defineComponent({
  name: 'StageBox',
  props: {
    stage: {
      type: Object as () => IStage,
      required: true,
    },
  },
  setup(props, { slots }) {
    const skeleton = useSkeleton();

    const isActive = computed(() => {
      return skeleton.stages.container.current === props.stage;
    });

    const handleClick = () => {
      props.stage.active();
    };

    const style = computed(() => ({
      display: props.stage.visible ? 'block' : 'none',
      opacity: props.stage.disabled ? 0.5 : 1,
      cursor: props.stage.disabled ? 'not-allowed' : 'pointer',
    }));

    return () => {
      return h('div', {
        class: ['lc-stage-box', { 'lc-stage-box-active': isActive.value }],
        style: style.value,
        onClick: handleClick,
      }, [
        h('div', { class: 'lc-stage-box-header' }, [
          h('span', { class: 'lc-stage-box-title' }, props.stage.title),
        ]),
        h('div', { class: 'lc-stage-box-body' }, [
          slots.default ? slots.default() : props.stage.content,
        ]),
      ]);
    };
  },
});

export default StageBox;
