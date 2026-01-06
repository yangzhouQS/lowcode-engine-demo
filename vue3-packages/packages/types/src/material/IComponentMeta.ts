/**
 * IComponentMeta Interface
 * 
 * 组件元数据接口,描述组件的基本信息和配置
 * 
 * @public
 */
export interface IComponentMeta {
  /**
   * 组件名称
   */
  componentName: string;

  /**
   * 组件标题
   */
  title: string;

  /**
   * 组件描述
   */
  description?: string;

  /**
   * 组件图标
   */
  icon?: string;

  /**
   * 组件标签
   */
  tags?: string[];

  /**
   * 组件分类
   */
  category?: string;

  /**
   * 组件NPM包信息
   */
  npm?: {
    package: string;
    version: string;
    exportName?: string;
    main?: string;
    destructuring?: boolean;
    subName?: string;
  };

  /**
   * 组件属性元数据
   */
  props?: Record<string, any>;

  /**
   * 组件事件元数据
   */
  events?: Record<string, any>;

  /**
   * 组件插槽元数据
   */
  slots?: Record<string, any>;

  /**
   * 组件配置项
   */
  configure?: {
    component?: any;
    props?: Record<string, any>;
    supports?: Record<string, any>;
    advanced?: Record<string, any>;
  };

  /**
   * 组件默认属性
   */
  defaultProps?: Record<string, any>;

  /**
   * 组件默认插槽
   */
  defaultSlots?: Record<string, any>;

  /**
   * 组件是否可拖拽
   */
  isContainer?: boolean;

  /**
   * 组件是否可嵌套
   */
  isNesting?: boolean;

  /**
   * 组件是否可编辑
   */
  isEditable?: boolean;

  /**
   * 组件是否可复制
   */
  isCopyable?: boolean;

  /**
   * 组件是否可删除
   */
  isDeletable?: boolean;
}
