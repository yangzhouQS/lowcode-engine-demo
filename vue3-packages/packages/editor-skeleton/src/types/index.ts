import type { Designer } from '@vue3-lowcode/designer';

/**
 * 编辑器骨架配置接口
 */
export interface SkeletonConfig {
  /**
   * 编辑器容器
   */
  container: HTMLElement | string;
  
  /**
   * 设计器实例
   */
  designer: Designer;
  
  /**
   * 编辑器主题
   */
  theme?: 'light' | 'dark' | 'auto';
  
  /**
   * 编辑器宽度
   */
  width?: string | number;
  
  /**
   * 编辑器高度
   */
  height?: string | number;
  
  /**
   * 是否启用动画
   */
  animated?: boolean;
  
  /**
   * 自定义样式类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: Record<string, any>;
}

/**
 * 区域配置接口
 */
export interface AreaConfig {
  /**
   * 区域名称
   */
  name: string;
  
  /**
   * 区域类型
   */
  type: 'top' | 'left' | 'right' | 'bottom' | 'main';
  
  /**
   * 区域标题
   */
  title?: string;
  
  /**
   * 区域图标
   */
  icon?: string;
  
  /**
   * 区域宽度
   */
  width?: string | number;
  
  /**
   * 区域高度
   */
  height?: string | number;
  
  /**
   * 最小宽度
   */
  minWidth?: string | number;
  
  /**
   * 最大宽度
   */
  maxWidth?: string | number;
  
  /**
   * 最小高度
   */
  minHeight?: string | number;
  
  /**
   * 最大高度
   */
  maxHeight?: string | number;
  
  /**
   * 是否可调整大小
   */
  resizable?: boolean;
  
  /**
   * 是否可折叠
   */
  collapsible?: boolean;
  
  /**
   * 默认是否折叠
   */
  collapsed?: boolean;
  
  /**
   * 是否可拖拽
   */
  draggable?: boolean;
  
  /**
   * 是否可关闭
   */
  closable?: boolean;
  
  /**
   * 自定义样式类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: Record<string, any>;
}

/**
 * Widget 配置接口
 */
export interface WidgetConfig {
  /**
   * Widget 名称
   */
  name: string;
  
  /**
   * Widget 标题
   */
  title: string;
  
  /**
   * Widget 图标
   */
  icon?: string;
  
  /**
   * Widget 组件
   */
  component: any;
  
  /**
   * Widget 属性
   */
  props?: Record<string, any>;
  
  /**
   * Widget 区域
   */
  area?: string;
  
  /**
   * Widget 索引
   */
  index?: number;
  
  /**
   * 是否可拖拽
   */
  draggable?: boolean;
  
  /**
   * 是否可调整大小
   */
  resizable?: boolean;
  
  /**
   * 是否可关闭
   */
  closable?: boolean;
  
  /**
   * 是否可折叠
   */
  collapsible?: boolean;
  
  /**
   * 默认是否折叠
   */
  collapsed?: boolean;
  
  /**
   * 自定义样式类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: Record<string, any>;
}

/**
 * 面板配置接口
 */
export interface PanelConfig {
  /**
   * 面板名称
   */
  name: string;
  
  /**
   * 面板标题
   */
  title: string;
  
  /**
   * 面板图标
   */
  icon?: string;
  
  /**
   * 面板组件
   */
  component: any;
  
  /**
   * 面板属性
   */
  props?: Record<string, any>;
  
  /**
   * 面板区域
   */
  area?: string;
  
  /**
   * 面板索引
   */
  index?: number;
  
  /**
   * 是否可拖拽
   */
  draggable?: boolean;
  
  /**
   * 是否可调整大小
   */
  resizable?: boolean;
  
  /**
   * 是否可关闭
   */
  closable?: boolean;
  
  /**
   * 是否可折叠
   */
  collapsible?: boolean;
  
  /**
   * 默认是否折叠
   */
  collapsed?: boolean;
  
  /**
   * 自定义样式类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: Record<string, any>;
}

/**
 * 设置面板配置接口
 */
export interface SettingsPaneConfig {
  /**
   * 设置面板名称
   */
  name: string;
  
  /**
   * 设置面板标题
   */
  title: string;
  
  /**
   * 设置面板图标
   */
  icon?: string;
  
  /**
   * 设置面板组件
   */
  component: any;
  
  /**
   * 设置面板属性
   */
  props?: Record<string, any>;
  
  /**
   * 设置面板区域
   */
  area?: string;
  
  /**
   * 设置面板索引
   */
  index?: number;
  
  /**
   * 是否可拖拽
   */
  draggable?: boolean;
  
  /**
   * 是否可调整大小
   */
  resizable?: boolean;
  
  /**
   * 是否可关闭
   */
  closable?: boolean;
  
  /**
   * 是否可折叠
   */
  collapsible?: boolean;
  
  /**
   * 默认是否折叠
   */
  collapsed?: boolean;
  
  /**
   * 自定义样式类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: Record<string, any>;
}

/**
 * 区域状态接口
 */
export interface AreaState {
  /**
   * 区域名称
   */
  name: string;
  
  /**
   * 是否折叠
   */
  collapsed: boolean;
  
  /**
   * 宽度
   */
  width?: string | number;
  
  /**
   * 高度
   */
  height?: string | number;
}

/**
 * Widget 状态接口
 */
export interface WidgetState {
  /**
   * Widget 名称
   */
  name: string;
  
  /**
   * 是否折叠
   */
  collapsed: boolean;
  
  /**
   * 宽度
   */
  width?: string | number;
  
  /**
   * 高度
   */
  height?: string | number;
  
  /**
   * 索引
   */
  index?: number;
}

/**
 * 面板状态接口
 */
export interface PanelState {
  /**
   * 面板名称
   */
  name: string;
  
  /**
   * 是否折叠
   */
  collapsed: boolean;
  
  /**
   * 宽度
   */
  width?: string | number;
  
  /**
   * 高度
   */
  height?: string | number;
  
  /**
   * 索引
   */
  index?: number;
}

/**
 * 设置面板状态接口
 */
export interface SettingsPaneState {
  /**
   * 设置面板名称
   */
  name: string;
  
  /**
   * 是否折叠
   */
  collapsed: boolean;
  
  /**
   * 宽度
   */
  width?: string | number;
  
  /**
   * 高度
   */
  height?: string | number;
  
  /**
   * 索引
   */
  index?: number;
}

/**
 * 区域事件接口
 */
export interface AreaEvents {
  /**
   * 区域折叠事件
   */
  onCollapse?: (name: string, collapsed: boolean) => void;
  
  /**
   * 区域调整大小事件
   */
  onResize?: (name: string, size: { width?: string | number; height?: string | number }) => void;
  
  /**
   * 区域拖拽事件
   */
  onDrag?: (name: string, position: { x: number; y: number }) => void;
  
  /**
   * 区域关闭事件
   */
  onClose?: (name: string) => void;
}

/**
 * Widget 事件接口
 */
export interface WidgetEvents {
  /**
   * Widget 折叠事件
   */
  onCollapse?: (name: string, collapsed: boolean) => void;
  
  /**
   * Widget 调整大小事件
   */
  onResize?: (name: string, size: { width?: string | number; height?: string | number }) => void;
  
  /**
   * Widget 拖拽事件
   */
  onDrag?: (name: string, position: { x: number; y: number }) => void;
  
  /**
   * Widget 关闭事件
   */
  onClose?: (name: string) => void;
  
  /**
   * Widget 点击事件
   */
  onClick?: (name: string) => void;
  
  /**
   * Widget 双击事件
   */
  onDoubleClick?: (name: string) => void;
}

/**
 * 面板事件接口
 */
export interface PanelEvents {
  /**
   * 面板折叠事件
   */
  onCollapse?: (name: string, collapsed: boolean) => void;
  
  /**
   * 面板调整大小事件
   */
  onResize?: (name: string, size: { width?: string | number; height?: string | number }) => void;
  
  /**
   * 面板拖拽事件
   */
  onDrag?: (name: string, position: { x: number; y: number }) => void;
  
  /**
   * 面板关闭事件
   */
  onClose?: (name: string) => void;
  
  /**
   * 面板点击事件
   */
  onClick?: (name: string) => void;
  
  /**
   * 面板双击事件
   */
  onDoubleClick?: (name: string) => void;
}

/**
 * 设置面板事件接口
 */
export interface SettingsPaneEvents {
  /**
   * 设置面板折叠事件
   */
  onCollapse?: (name: string, collapsed: boolean) => void;
  
  /**
   * 设置面板调整大小事件
   */
  onResize?: (name: string, size: { width?: string | number; height?: string | number }) => void;
  
  /**
   * 设置面板拖拽事件
   */
  onDrag?: (name: string, position: { x: number; y: number }) => void;
  
  /**
   * 设置面板关闭事件
   */
  onClose?: (name: string) => void;
  
  /**
   * 设置面板点击事件
   */
  onClick?: (name: string) => void;
  
  /**
   * 设置面板双击事件
   */
  onDoubleClick?: (name: string) => void;
}

/**
 * 骨架事件接口
 */
export interface SkeletonEvents {
  /**
   * 初始化事件
   */
  onInit?: () => void;
  
  /**
   * 销毁事件
   */
  onDestroy?: () => void;
  
  /**
   * 区域添加事件
   */
  onAreaAdd?: (area: AreaConfig) => void;
  
  /**
   * 区域移除事件
   */
  onAreaRemove?: (name: string) => void;
  
  /**
   * Widget 添加事件
   */
  onWidgetAdd?: (widget: WidgetConfig) => void;
  
  /**
   * Widget 移除事件
   */
  onWidgetRemove?: (name: string) => void;
  
  /**
   * 面板添加事件
   */
  onPanelAdd?: (panel: PanelConfig) => void;
  
  /**
   * 面板移除事件
   */
  onPanelRemove?: (name: string) => void;
  
  /**
   * 设置面板添加事件
   */
  onSettingsPaneAdd?: (settingsPane: SettingsPaneConfig) => void;
  
  /**
   * 设置面板移除事件
   */
  onSettingsPaneRemove?: (name: string) => void;
}
