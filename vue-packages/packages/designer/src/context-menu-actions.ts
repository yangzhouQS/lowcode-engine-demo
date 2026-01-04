import { IPublicTypeContextMenuAction, IPublicTypeContextMenuItem, IPublicTypeNode, IPublicTypeIconType } from '@alilc/lowcode-types';

/**
 * 上下文菜单动作类型
 */
export interface ContextMenuAction extends IPublicTypeContextMenuAction {
  /**
   * 动作唯一标识
   */
  name: string;

  /**
   * 动作显示名称
   */
  title: string;

  /**
   * 动作描述
   */
  description?: string;

  /**
   * 动作图标
   */
  icon?: IPublicTypeIconType;

  /**
   * 是否可见
   */
  visible?: boolean;

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 点击处理函数
   */
  onClick?: (node: IPublicTypeNode) => void;

  /**
   * 是否需要选中节点
   */
  needSelection?: boolean;

  /**
   * 动作条件函数
   */
  condition?: (node: IPublicTypeNode) => boolean;

  /**
   * 子菜单项
   */
  items?: ContextMenuAction[];
}

/**
 * 创建上下文菜单动作
 */
export function createContextMenuAction(action: Partial<ContextMenuAction>): ContextMenuAction {
  return {
    name: action.name || '',
    title: action.title || '',
    description: action.description,
    icon: action.icon,
    visible: action.visible !== undefined ? action.visible : true,
    disabled: action.disabled || false,
    onClick: action.onClick,
    needSelection: action.needSelection !== undefined ? action.needSelection : true,
    condition: action.condition,
    items: action.items,
  };
}

/**
 * 创建分隔符
 */
export function createSeparator(): ContextMenuAction {
  return {
    name: 'separator',
    title: '-',
    visible: true,
    disabled: true,
    needSelection: false,
  };
}

/**
 * 预定义的上下文菜单动作
 */
export const predefinedContextMenuActions: ContextMenuAction[] = [
  {
    name: 'copy',
    title: '复制',
    icon: 'clone',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  {
    name: 'cut',
    title: '剪切',
    icon: 'clone',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  {
    name: 'paste',
    title: '粘贴',
    icon: 'clone',
    visible: true,
    disabled: false,
    needSelection: false,
  },
  createSeparator(),
  {
    name: 'remove',
    title: '删除',
    icon: 'remove',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  {
    name: 'lock',
    title: '锁定',
    icon: 'lock',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  {
    name: 'unlock',
    title: '解锁',
    icon: 'unlock',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  createSeparator(),
  {
    name: 'hide',
    title: '隐藏',
    icon: 'hidden',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  {
    name: 'show',
    title: '显示',
    icon: 'hidden',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  createSeparator(),
  {
    name: 'setting',
    title: '设置',
    icon: 'setting',
    visible: true,
    disabled: false,
    needSelection: true,
  },
];

/**
 * 根据节点获取上下文菜单动作
 */
export function getContextMenuActions(node: IPublicTypeNode): ContextMenuAction[] {
  if (!node) {
    return [];
  }

  const actions: ContextMenuAction[] = [];

  // 过滤可见的动作
  predefinedContextMenuActions.forEach(action => {
    if (action.condition && !action.condition(node)) {
      return;
    }
    if (action.visible === false) {
      return;
    }
    actions.push(action);
  });

  return actions;
}

/**
 * 根据节点获取上下文菜单项
 */
export function getContextMenuItems(node: IPublicTypeNode): IPublicTypeContextMenuItem[] {
  const actions = getContextMenuActions(node);
  
  return actions.map(action => {
    return {
      name: action.name,
      title: action.title,
      icon: action.icon,
      disabled: action.disabled || false,
      action: () => {
        if (action.onClick) {
          action.onClick(node);
        }
      },
    };
  });
}

export default {
  createContextMenuAction,
  createSeparator,
  predefinedContextMenuActions,
  getContextMenuActions,
  getContextMenuItems,
};
