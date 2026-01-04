/**
 * Vue3 LowCode Engine - Utils Package
 * 工作区相关工具
 */

import { defineComponent, h, VNode, ref, computed } from 'vue';

export interface WorkspaceItem {
  id: string;
  name: string;
  icon?: string;
  type?: string;
  data?: any;
}

export interface WorkspaceOptions {
  items?: WorkspaceItem[];
  activeId?: string;
  onItemClick?: (item: WorkspaceItem) => void;
  onItemClose?: (item: WorkspaceItem) => void;
}

export const Workspace = defineComponent({
  name: 'Workspace',
  props: {
    items: {
      type: Array as () => WorkspaceItem[],
      default: () => [],
    },
    activeId: {
      type: String,
      default: '',
    },
  },
  emits: ['item-click', 'item-close'],
  setup(props, { emit }) {
    const activeItem = computed(() => {
      return props.items.find(item => item.id === props.activeId);
    });

    const handleClick = (item: WorkspaceItem) => {
      emit('item-click', item);
    };

    const handleClose = (item: WorkspaceItem, event: Event) => {
      event.stopPropagation();
      emit('item-close', item);
    };

    return () => {
      return h('div', { class: 'workspace' }, [
        h('div', { class: 'workspace-header' }, [
          h('h3', { class: 'workspace-title' }, 'Workspace'),
        ]),
        h('div', { class: 'workspace-content' }, [
          h('ul', { class: 'workspace-list' }, 
            props.items.map(item => 
              h('li', { 
                class: ['workspace-item', { active: item.id === props.activeId }],
                key: item.id,
                onClick: () => handleClick(item),
              }, [
                item.icon && h('span', { class: 'workspace-item-icon' }, item.icon),
                h('span', { class: 'workspace-item-name' }, item.name),
                h('button', {
                  class: 'workspace-item-close',
                  onClick: (e: Event) => handleClose(item, e),
                }, '×'),
              ])
            )
          ),
        ]),
        activeItem.value && h('div', { class: 'workspace-detail' }, [
          h('h4', { class: 'workspace-detail-title' }, activeItem.value.name),
          h('div', { class: 'workspace-detail-content' }, [
            h('pre', { class: 'workspace-detail-data' }, JSON.stringify(activeItem.value.data, null, 2)),
          ]),
        ]),
      ]);
    };
  },
});

export function createWorkspace(options: WorkspaceOptions = {}): VNode {
  return h(Workspace, {
    items: options.items || [],
    activeId: options.activeId || '',
    onItemClick: options.onItemClick,
    onItemClose: options.onItemClose,
  });
}

export function createWorkspaceItem(
  id: string,
  name: string,
  data?: any,
  icon?: string
): WorkspaceItem {
  return {
    id,
    name,
    data,
    icon,
  };
}
