/**
 * ISlotMeta Interface
 * 
 * 插槽元数据接口,描述插槽的基本信息和配置
 * 
 * @public
 */
export interface ISlotMeta {
  /**
   * 插槽名称
   */
  name: string;

  /**
   * 插槽标题
   */
  title: string;

  /**
   * 插槽描述
   */
  description?: string;

  /**
   * 插槽类型
   */
  type?: string;

  /**
   * 插槽默认值
   */
  defaultValue?: any;

  /**
   * 插槽是否必填
   */
  required?: boolean;

  /**
   * 插槽是否可配置
   */
  configurable?: boolean;

  /**
   * 插槽是否可编辑
   */
  editable?: boolean;

  /**
   * 插槽是否可见
   */
  visible?: boolean;

  /**
   * 插槽配置项
   */
  configure?: Record<string, any>;

  /**
   * 插槽参数
   */
  params?: Array<{
    name: string;
    type: string;
    description?: string;
  }>;

  /**
   * 插槽作用域
   */
  scope?: Record<string, any>;
}
