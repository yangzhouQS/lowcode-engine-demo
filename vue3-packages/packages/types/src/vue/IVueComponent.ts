/**
 * IVueComponent Interface
 * 
 * Vue3组件接口,定义Vue3组件的基本类型
 * 
 * @public
 */
export interface IVueComponent<P = any, E = any> {
  /**
   * 组件名称
   */
  name?: string;

  /**
   * 组件属性
   */
  props?: P;

  /**
   * 组件事件
   */
  emits?: E;

  /**
   * 组件插槽
   */
  slots?: Record<string, any>;

  /**
   * 组件配置
   */
  setup?: () => any;

  /**
   * 组件生命周期
   */
  beforeCreate?: () => void;
  created?: () => void;
  beforeMount?: () => void;
  mounted?: () => void;
  beforeUpdate?: () => void;
  updated?: () => void;
  beforeUnmount?: () => void;
  unmounted?: () => void;
  errorCaptured?: (err: Error, instance: any, info: string) => boolean | void;
  renderTracked?: (e: any) => void;
  renderTriggered?: (e: any) => void;
  activated?: () => void;
  deactivated?: () => void;
}

/**
 * VueComponentOptions Interface
 * 
 * Vue3组件选项接口
 * 
 * @public
 */
export interface VueComponentOptions {
  /**
   * 组件名称
   */
  name?: string;

  /**
   * 组件继承
   */
  inheritAttrs?: boolean;

  /**
   * 组件混入
   */
  mixins?: any[];

  /**
   * 组件扩展
   */
  extends?: any;

  /**
   * 组件属性
   */
  props?: Record<string, any> | string[];

  /**
   * 组件数据
   */
  data?: () => Record<string, any>;

  /**
   * 组件计算属性
   */
  computed?: Record<string, any>;

  /**
   * 组件方法
   */
  methods?: Record<string, any>;

  /**
   * 组件监听器
   */
  watch?: Record<string, any>;

  /**
   * 组件生命周期
   */
  beforeCreate?: () => void;
  created?: () => void;
  beforeMount?: () => void;
  mounted?: () => void;
  beforeUpdate?: () => void;
  updated?: () => void;
  beforeUnmount?: () => void;
  unmounted?: () => void;
  activated?: () => void;
  deactivated?: () => void;
  errorCaptured?: (err: Error, instance: any, info: string) => boolean | void;

  /**
   * 组件模板
   */
  template?: string | any;

  /**
   * 组件渲染函数
   */
  render?: () => any;

  /**
   * 组件设置函数
   */
  setup?: (props: any, context: any) => any;

  /**
   * 组件指令
   */
  directives?: Record<string, any>;

  /**
   * 组件组件
   */
  components?: Record<string, any>;

  /**
   * 组件过滤器
   */
  filters?: Record<string, any>;

  /**
   * 组件提供
   */
  provide?: any;

  /**
   * 组件注入
   */
  inject?: Record<string, any> | any[];
}
