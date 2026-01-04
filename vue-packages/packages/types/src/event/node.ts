/**
 * Vue3 LowCode Engine - Node Event Types
 * 低代码引擎节点事件类型定义
 */

import { IPublicModelNode } from '../model';

/**
 * 节点事件接口
 */
export interface NodeEvent {
  /**
   * 事件类型
   */
  type: string;

  /**
   * 节点
   */
  node: IPublicModelNode;

  /**
   * 事件数据
   */
  data?: any;

  /**
   * 时间戳
   */
  timestamp: number;
}

/**
 * 节点添加事件
 */
export interface NodeAddEvent extends NodeEvent {
  type: 'node.add';

  /**
   * 父节点
   */
  parent: IPublicModelNode;

  /**
   * 索引
   */
  index?: number;
}

/**
 * 节点移除事件
 */
export interface NodeRemoveEvent extends NodeEvent {
  type: 'node.remove';

  /**
   * 父节点
   */
  parent: IPublicModelNode;

  /**
   * 索引
   */
  index?: number;
}

/**
 * 节点移动事件
 */
export interface NodeMoveEvent extends NodeEvent {
  type: 'node.move';

  /**
   * 旧父节点
   */
  oldParent: IPublicModelNode;

  /**
   * 新父节点
   */
  newParent: IPublicModelNode;

  /**
   * 旧索引
   */
  oldIndex?: number;

  /**
   * 新索引
   */
  newIndex?: number;
}

/**
 * 节点更新事件
 */
export interface NodeUpdateEvent extends NodeEvent {
  type: 'node.update';

  /**
   * 更新的属性
   */
  props: Record<string, any>;
}

/**
 * 节点选择事件
 */
export interface NodeSelectEvent extends NodeEvent {
  type: 'node.select';

  /**
   * 是否选中
   */
  selected: boolean;
}

/**
 * 节点悬停事件
 */
export interface NodeHoverEvent extends NodeEvent {
  type: 'node.hover';

  /**
   * 是否悬停
   */
  hovered: boolean;
}

/**
 * 节点拖拽事件
 */
export interface NodeDragEvent extends NodeEvent {
  type: 'node.drag';

  /**
   * 拖拽数据
   */
  dragData: any;
}

/**
 * 节点放置事件
 */
export interface NodeDropEvent extends NodeEvent {
  type: 'node.drop';

  /**
   * 放置数据
   */
  dropData: any;

  /**
   * 目标节点
   */
  target: IPublicModelNode;

  /**
   * 位置
   */
  location?: any;
}
