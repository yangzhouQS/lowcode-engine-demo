/**
 * Vue3 LowCode Engine - Utils Package
 * 上下文菜单相关工具
 */

import { defineComponent, h, VNode, ref, onMounted, onUnmounted } from 'vue';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
  children?: ContextMenuItem[];
}

export interface ContextMenuOptions {
  items: ContextMenuItem[];
  x: number;
  y: number;
  onItemClick?: (item: ContextMenuItem) => void;
}

export const ContextMenu = defineComponent({
  name: 'ContextMenu',
  props: {
    items: {
      type: Array as () => ContextMenuItem[],
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  emits: ['item-click', 'close'],
  setup(props, { emit }) {
    const menuRef = ref<HTMLElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
        emit('close');
      }
    };

    const handleItemClick = (item: ContextMenuItem) => {
      if (item.disabled) return;
      if (item.onClick) {
        item.onClick();
      }
      emit('item-click', item);
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return () => {
      return h('div', {
        ref: menuRef,
        class: 'context-menu',
        style: {
          position: 'fixed',
          left: `${props.x}px`,
          top: `${props.y}px`,
          zIndex: 9999,
        },
      }, [
        h('ul', { class: 'context-menu-list' },
          props.items.map(item => {
            if (item.divider) {
              return h('li', { class: 'context-menu-divider', key: item.id });
            }

            const hasChildren = item.children && item.children.length > 0;

            return h('li', {
              class: ['context-menu-item', { disabled: item.disabled, 'has-children': hasChildren }],
              key: item.id,
              onClick: () => handleItemClick(item),
            }, [
              item.icon && h('span', { class: 'context-menu-item-icon' }, item.icon),
              h('span', { class: 'context-menu-item-label' }, item.label),
              hasChildren && h('span', { class: 'context-menu-item-arrow' }, '›'),
            ]);
          })
        ),
      ]);
    };
  },
});

export function createContextMenu(options: ContextMenuOptions): VNode {
  return h(ContextMenu, {
    items: options.items,
    x: options.x,
    y: options.y,
    onItemClick: options.onItemClick,
  });
}

export function createContextMenuItem(
  id: string,
  label: string,
  onClick?: () => void,
  options: Partial<ContextMenuItem> = {}
): ContextMenuItem {
  return {
    id,
    label,
    onClick,
    ...options,
  };
}

export function createContextMenuDivider(id: string): ContextMenuItem {
  return {
    id,
    label: '',
    divider: true,
  };
}
