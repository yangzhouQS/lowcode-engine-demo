/**
 * IVueEvent Interface
 * 
 * Vue3事件接口,定义Vue3组件事件的基本类型
 * 
 * @public
 */
export interface IVueEvent {
  /**
   * 事件名称
   */
  name: string;

  /**
   * 事件处理器
   */
  handler: (...args: any[]) => any;

  /**
   * 事件修饰符
   */
  modifiers?: EventModifiers;

  /**
   * 事件是否被阻止
   */
  stopped?: boolean;

  /**
   * 事件是否被阻止默认行为
   */
  prevented?: boolean;
}

/**
 * EventModifiers Interface
 * 
 * 事件修饰符接口
 * 
 * @public
 */
export interface EventModifiers {
  /**
   * 阻止事件冒泡
   */
  stop?: boolean;

  /**
   * 阻止默认行为
   */
  prevent?: boolean;

  /**
   * 事件只触发一次
   */
  once?: boolean;

  /**
   * 使用事件捕获模式
   */
  capture?: boolean;

  /**
   * 事件只从自身触发
   */
  self?: boolean;

  /**
   * 按键修饰符
   */
  keys?: string[];

  /**
   * 系统修饰键
   */
  systemModifiers?: {
    /**
     * Ctrl键
     */
    ctrl?: boolean;

    /**
     * Shift键
     */
    shift?: boolean;

    /**
     * Alt键
     */
    alt?: boolean;

    /**
     * Meta键
     */
    meta?: boolean;
  };

  /**
   * 鼠标按钮修饰符
   */
  mouseButtons?: {
    /**
     * 左键
     */
    left?: boolean;

    /**
     * 中键
     */
    middle?: boolean;

    /**
     * 右键
     */
    right?: boolean;
  };
}

/**
 * EventHandler Interface
 * 
 * 事件处理器接口
 * 
 * @public
 */
export type EventHandler<T = any> = (event: T, ...args: any[]) => void;

/**
 * EventMap Interface
 * 
 * 事件映射接口
 * 
 * @public
 */
export interface EventMap {
  /**
   * 事件映射
   */
  [event: string]: EventHandler | EventHandler[];
}

/**
 * NativeEventMap Interface
 * 
 * 原生事件映射接口
 * 
 * @public
 */
export interface NativeEventMap {
  /**
   * 点击事件
   */
  onClick?: EventHandler<MouseEvent>;

  /**
   * 双击事件
   */
  onDblclick?: EventHandler<MouseEvent>;

  /**
   * 鼠标按下事件
   */
  onMousedown?: EventHandler<MouseEvent>;

  /**
   * 鼠标抬起事件
   */
  onMouseup?: EventHandler<MouseEvent>;

  /**
   * 鼠标移动事件
   */
  onMousemove?: EventHandler<MouseEvent>;

  /**
   * 鼠标进入事件
   */
  onMouseenter?: EventHandler<MouseEvent>;

  /**
   * 鼠标离开事件
   */
  onMouseleave?: EventHandler<MouseEvent>;

  /**
   * 鼠标悬停事件
   */
  onMouseover?: EventHandler<MouseEvent>;

  /**
   * 鼠标移出事件
   */
  onMouseout?: EventHandler<MouseEvent>;

  /**
   * 键盘按下事件
   */
  onKeydown?: EventHandler<KeyboardEvent>;

  /**
   * 键盘抬起事件
   */
  onKeyup?: EventHandler<KeyboardEvent>;

  /**
   * 键盘按下并释放事件
   */
  onKeypress?: EventHandler<KeyboardEvent>;

  /**
   * 获得焦点事件
   */
  onFocus?: EventHandler<FocusEvent>;

  /**
   * 失去焦点事件
   */
  onBlur?: EventHandler<FocusEvent>;

  /**
   * 表单提交事件
   */
  onSubmit?: EventHandler<Event>;

  /**
   * 输入事件
   */
  onInput?: EventHandler<Event>;

  /**
   * 变更事件
   */
  onChange?: EventHandler<Event>;
}
