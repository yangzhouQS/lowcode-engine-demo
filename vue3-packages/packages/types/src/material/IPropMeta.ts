/**
 * IPropMeta Interface
 * 
 * 属性元数据接口,描述属性的基本信息和配置
 * 
 * @public
 */
export interface IPropMeta {
  /**
   * 属性名称
   */
  name: string;

  /**
   * 属性标题
   */
  title: string;

  /**
   * 属性描述
   */
  description?: string;

  /**
   * 属性类型
   */
  type: string | string[];

  /**
   * 属性默认值
   */
  defaultValue?: any;

  /**
   * 属性是否必填
   */
  required?: boolean;

  /**
   * 属性设置器
   */
  setter?: string | any;

  /**
   * 属性设置器配置
   */
  setterProps?: Record<string, any>;

  /**
   * 属性是否可编辑
   */
  editable?: boolean;

  /**
   * 属性是否可见
   */
  visible?: boolean;

  /**
   * 属性是否可配置
   */
  configurable?: boolean;

  /**
   * 属性配置项
   */
  configure?: Record<string, any>;

  /**
   * 属性验证规则
   */
  validate?: {
    required?: boolean;
    pattern?: RegExp;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    custom?: (value: any) => boolean | string;
  };

  /**
   * 属性枚举值
   */
  enum?: any[];

  /**
   * 属性枚举配置
   */
  enumProps?: {
    labels?: Record<string, string>;
    icons?: Record<string, string>;
  };
}
