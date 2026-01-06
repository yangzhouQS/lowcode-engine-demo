/**
 * ISchema Interface
 * 
 * Schema接口,描述低代码页面的结构
 * 
 * @public
 */
export interface ISchema {
  /**
   * 组件名称
   */
  componentName: string;

  /**
   * 组件ID
   */
  id?: string;

  /**
   * 组件属性
   */
  props?: Record<string, any>;

  /**
   * 组件子节点
   */
  children?: ISchema[];

  /**
   * 组件插槽
   */
  slots?: Record<string, ISchema | ISchema[]>;

  /**
   * 组件事件
   */
  events?: Record<string, any>;

  /**
   * 组件条件渲染
   */
  condition?: boolean | string;

  /**
   * 组件循环渲染
   */
  loop?: any;

  /**
   * 组件循环变量
   */
  loopArgs?: string[];

  /**
   * 组件样式
   */
  style?: Record<string, any>;

  /**
   * 组件类名
   */
  className?: string | string[];

  /**
   * 组件自定义数据
   */
  custom?: Record<string, any>;

  /**
   * 组件是否隐藏
   */
  hidden?: boolean;

  /**
   * 组件是否锁定
   */
  locked?: boolean;

  /**
   * 组件元数据
   */
  metadata?: Record<string, any>;
}

/**
 * PageSchema Interface
 * 
 * 页面Schema接口,描述整个页面的结构
 * 
 * @public
 */
export interface PageSchema {
  /**
   * 页面ID
   */
  id?: string;

  /**
   * 页面名称
   */
  name?: string;

  /**
   * 页面标题
   */
  title?: string;

  /**
   * 页面描述
   */
  description?: string;

  /**
   * 页面版本
   */
  version?: string;

  /**
   * 页面组件树
   */
  componentsTree: ISchema;

  /**
   * 页面组件元数据
   */
  componentsMap?: Record<string, any>;

  /**
   * 页面全局样式
   */
  globalStyle?: Record<string, any>;

  /**
   * 页面全局状态
   */
  state?: Record<string, any>;

  /**
   * 页面生命周期
   */
  lifeCycles?: Record<string, any>;

  /**
   * 页面数据源
   */
  dataSource?: any[];

  /**
   * 页面路由配置
   */
  route?: Record<string, any>;

  /**
   * 页面自定义配置
   */
  custom?: Record<string, any>;
}
