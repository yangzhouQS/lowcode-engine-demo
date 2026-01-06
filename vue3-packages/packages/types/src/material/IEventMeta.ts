/**
 * IEventMeta Interface
 * 
 * 事件元数据接口,描述事件的基本信息和配置
 * 
 * @public
 */
export interface IEventMeta {
  /**
   * 事件名称
   */
  name: string;

  /**
   * 事件标题
   */
  title: string;

  /**
   * 事件描述
   */
  description?: string;

  /**
   * 事件类型
   */
  type?: string;

  /**
   * 事件参数
   */
  params?: Array<{
    name: string;
    type: string;
    description?: string;
  }>;

  /**
   * 事件是否可配置
   */
  configurable?: boolean;

  /**
   * 事件是否必填
   */
  required?: boolean;

  /**
   * 事件默认值
   */
  defaultValue?: any;

  /**
   * 事件配置项
   */
  configure?: Record<string, any>;
}
