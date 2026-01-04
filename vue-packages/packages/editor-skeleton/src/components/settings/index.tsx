import { defineComponent, h, ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useSkeleton } from '../../context';

export interface SettingsProps {
  title?: string;
  children?: any;
}

export const SettingsView = defineComponent({
  name: 'SettingsView',
  props: {
    title: String,
  },
  setup(props, { slots }) {
    const skeleton = useSkeleton();
    const visible = ref(true);
    const activeTab = ref('');

    const toggle = () => {
      visible.value = !visible.value;
    };

    const setActiveTab = (tab: string) => {
      activeTab.value = tab;
    };

    return () => {
      return h('div', {
        class: 'lc-settings',
      }, [
        h('div', {
          class: 'lc-settings-header',
        }, [
          h('span', { class: 'lc-settings-title' }, props.title || 'Settings'),
          h('button', {
            class: 'lc-settings-close',
            onClick: toggle,
          }, '×'),
        ]),
        h('div', {
          class: 'lc-settings-body',
          style: {
            display: visible.value ? 'block' : 'none',
          },
        }, [
          slots.default ? slots.default() : null,
        ]),
      ]);
    };
  },
});

export default SettingsView;
