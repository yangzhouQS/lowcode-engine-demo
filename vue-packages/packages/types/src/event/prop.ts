/**
 * Vue3 LowCode Engine - Prop Event Types
 * 低代码引擎属性事件类型定义
 */

import { IPublicModelProp } from '../model';

/**
 * 属性事件接口
 */
export interface PropEvent {
  /**
   * 事件类型
   */
  type: string;

  /**
   * 属性
   */
  prop: IPublicModelProp;

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
 * 属性值变化事件
 */
export interface PropValueChangeEvent extends PropEvent {
  type: 'prop.valueChange';

  /**
   * 旧值
   */
  oldValue: any;

  /**
   * 新值
   */
  newValue: any;

  /**
   * 变化类型
   */
  changeType: 'add' | 'remove' | 'update';
}

/**
 * 属性添加事件
 */
export interface PropAddEvent extends PropEvent {
  type: 'prop.add';

  /**
   * 属性路径
   */
  path: string;

  /**
   * 属性值
   */
  value: any;
}

/**
 * 属性移除事件
 */
export interface PropRemoveEvent extends PropEvent {
  type: 'prop.remove';

  /**
   * 属性路径
   */
  path: string;

  /**
   * 属性值
   */
  value: any;
}

/**
 * 属性更新事件
 */
export interface PropUpdateEvent extends PropEvent {
  type: 'prop.update';

  /**
   * 属性路径
   */
  path: string;

  /**
   * 旧值
   */
  oldValue: any;

  /**
   * 新值
   */
  newValue: any;
}
