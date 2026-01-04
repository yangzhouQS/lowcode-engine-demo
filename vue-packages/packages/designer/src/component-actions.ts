import { IPublicTypeComponentAction, IPublicTypeNode, IPublicTypeIconType } from '@alilc/lowcode-types';

/**
 * 组件动作类型
 */
export interface ComponentAction extends IPublicTypeComponentAction {
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
   * 动作类型
   */
  type?: 'Node' | 'Group' | 'Page' | 'Component';

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
}

/**
 * 创建组件动作
 */
export function createComponentAction(action: Partial<ComponentAction>): ComponentAction {
  return {
    name: action.name || '',
    title: action.title || '',
    description: action.description,
    icon: action.icon,
    type: action.type || 'Component',
    visible: action.visible !== undefined ? action.visible : true,
    disabled: action.disabled || false,
    onClick: action.onClick,
    needSelection: action.needSelection !== undefined ? action.needSelection : true,
  };
}

/**
 * 创建节点动作
 */
export function createNodeAction(action: Partial<ComponentAction>): ComponentAction {
  return createComponentAction({
    ...action,
    type: 'Node',
  });
}

/**
 * 创建分组动作
 */
export function createGroupAction(action: Partial<ComponentAction>): ComponentAction {
  return createComponentAction({
    ...action,
    type: 'Group',
  });
}

/**
 * 创建页面动作
 */
export function createPageAction(action: Partial<ComponentAction>): ComponentAction {
  return createComponentAction({
    ...action,
    type: 'Page',
  });
}

/**
 * 预定义的组件动作
 */
export const predefinedActions: ComponentAction[] = [
  {
    name: 'remove',
    title: '删除',
    icon: 'remove',
    type: 'Node',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  {
    name: 'copy',
    title: '复制',
    icon: 'clone',
    type: 'Node',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  {
    name: 'lock',
    title: '锁定',
    icon: 'lock',
    type: 'Node',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  {
    name: 'unlock',
    title: '解锁',
    icon: 'unlock',
    type: 'Node',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  {
    name: 'hide',
    title: '隐藏',
    icon: 'hidden',
    type: 'Node',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  {
    name: 'show',
    title: '显示',
    icon: 'hidden',
    type: 'Node',
    visible: true,
    disabled: false,
    needSelection: true,
  },
  {
    name: 'setting',
    title: '设置',
    icon: 'setting',
    type: 'Node',
    visible: true,
    disabled: false,
    needSelection: true,
  },
];

export default {
  createComponentAction,
  createNodeAction,
  createGroupAction,
  createPageAction,
  predefinedActions,
};
