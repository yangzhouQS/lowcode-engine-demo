import { defineComponent, h, computed, ref } from 'vue';

export interface FieldProps {
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  children?: any;
}

export const FieldView = defineComponent({
  name: 'FieldView',
  props: {
    label: String,
    value: [String, Number, Boolean, Object, Array],
    onChange: Function,
  },
  setup(props, { slots, emit }) {
    const handleChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      emit('change', value);
      props.onChange?.(value);
    };

    const inputType = computed(() => {
      if (typeof props.value === 'boolean') return 'checkbox';
      if (typeof props.value === 'number') return 'number';
      return 'text';
    });

    return () => {
      return h('div', {
        class: 'lc-field',
      }, [
        props.label ? h('label', { class: 'lc-field-label' }, props.label) : null,
        slots.default ? slots.default() : h('input', {
          class: 'lc-field-input',
          type: inputType.value,
          value: props.value,
          checked: typeof props.value === 'boolean' ? props.value : undefined,
          onChange: handleChange,
        }),
      ]);
    };
  },
});

export default FieldView;
