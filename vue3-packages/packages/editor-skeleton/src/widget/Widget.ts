import { ref, type Ref } from 'vue';
import type { WidgetConfig, WidgetState, WidgetEvents } from '../types';

/**
 * Widget 类 - 编辑器 Widget 管理
 */
export class Widget {
  /**
   * Widget 配置
   */
  protected config: WidgetConfig;
  
  /**
   * Widget 状态
   */
  protected state: Ref<WidgetState>;
  
  /**
   * Widget 事件
   */
  protected events: WidgetEvents;
  
  /**
   * 是否已初始化
   */
  protected initialized: boolean = false;
  
  /**
   * 是否已销毁
   */
  protected destroyed: boolean = false;
  
  /**
   * Widget 容器元素
   */
  protected container: HTMLElement | null = null;
  
  /**
   * 构造函数
   * @param config Widget 配置
   * @param events Widget 事件
   */
  constructor(config: WidgetConfig, events: WidgetEvents = {}) {
    this.config = config;
    this.events = events;
    
    // 初始化状态
    this.state = ref<WidgetState>({
      name: config.name,
      collapsed: config.collapsed || false,
      width: config.props?.width,
      height: config.props?.height,
      index: config.index,
    });
    
    this.log('Widget created:', config.name);
  }
  
  /**
   * 初始化 Widget
   * @param container Widget 容器
   */
  init(container: HTMLElement): void {
    if (this.initialized) {
      this.warn('Widget already initialized:', this.config.name);
      return;
    }
    
    if (this.destroyed) {
      this.warn('Widget already destroyed:', this.config.name);
      return;
    }
    
    this.container = container;
    this.initialized = true;
    
    this.log('Widget initialized:', this.config.name);
  }
  
  /**
   * 销毁 Widget
   */
  destroy(): void {
    if (!this.initialized) {
      this.warn('Widget not initialized:', this.config.name);
      return;
    }
    
    if (this.destroyed) {
      this.warn('Widget already destroyed:', this.config.name);
      return;
    }
    
    this.container = null;
    this.destroyed = true;
    
    this.log('Widget destroyed:', this.config.name);
  }
  
  /**
   * 获取 Widget 配置
   */
  getConfig(): WidgetConfig {
    return { ...this.config };
  }
  
  /**
   * 获取 Widget 状态
   */
  getState(): WidgetState {
    return { ...this.state.value };
  }
  
  /**
   * 设置 Widget 配置
   * @param config Widget 配置
   */
  setConfig(config: Partial<WidgetConfig>): void {
    this.config = { ...this.config, ...config };
    this.log('Widget config updated:', this.config.name, config);
  }
  
  /**
   * 设置 Widget 状态
   * @param state Widget 状态
   */
  setState(state: Partial<WidgetState>): void {
    this.state.value = { ...this.state.value, ...state };
    this.log('Widget state updated:', this.config.name, state);
  }
  
  /**
   * 获取 Widget 名称
   */
  getName(): string {
    return this.config.name;
  }
  
  /**
   * 获取 Widget 标题
   */
  getTitle(): string {
    return this.config.title;
  }
  
  /**
   * 获取 Widget 图标
   */
  getIcon(): string | undefined {
    return this.config.icon;
  }
  
  /**
   * 获取 Widget 组件
   */
  getComponent(): any {
    return this.config.component;
  }
  
  /**
   * 获取 Widget 属性
   */
  getProps(): Record<string, any> {
    return { ...this.config.props };
  }
  
  /**
   * 设置 Widget 属性
   * @param props Widget 属性
   */
  setProps(props: Partial<Record<string, any>>): void {
    this.config.props = { ...this.config.props, ...props };
    this.log('Widget props updated:', this.config.name, props);
  }
  
  /**
   * 获取 Widget 区域
   */
  getArea(): string | undefined {
    return this.config.area;
  }
  
  /**
   * 设置 Widget 区域
   * @param area Widget 区域
   */
  setArea(area: string): void {
    const oldArea = this.config.area;
    this.config.area = area;
    this.log('Widget area updated:', this.config.name, oldArea, '->', area);
  }
  
  /**
   * 获取 Widget 索引
   */
  getIndex(): number | undefined {
    return this.state.value.index;
  }
  
  /**
   * 设置 Widget 索引
   * @param index Widget 索引
   */
  setIndex(index: number): void {
    const oldIndex = this.state.value.index;
    this.state.value.index = index;
    this.log('Widget index updated:', this.config.name, oldIndex, '->', index);
  }
  
  /**
   * 获取 Widget 宽度
   */
  getWidth(): string | number | undefined {
    return this.state.value.width;
  }
  
  /**
   * 设置 Widget 宽度
   * @param width Widget 宽度
   */
  setWidth(width: string | number): void {
    const oldWidth = this.state.value.width;
    this.state.value.width = width;
    
    if (this.events.onResize) {
      this.events.onResize(this.config.name, { width });
    }
    
    this.log('Widget width updated:', this.config.name, oldWidth, '->', width);
  }
  
  /**
   * 获取 Widget 高度
   */
  getHeight(): string | number | undefined {
    return this.state.value.height;
  }
  
  /**
   * 设置 Widget 高度
   * @param height Widget 高度
   */
  setHeight(height: string | number): void {
    const oldHeight = this.state.value.height;
    this.state.value.height = height;
    
    if (this.events.onResize) {
      this.events.onResize(this.config.name, { height });
    }
    
    this.log('Widget height updated:', this.config.name, oldHeight, '->', height);
  }
  
  /**
   * 获取 Widget 尺寸
   */
  getSize(): { width?: string | number; height?: string | number } {
    return {
      width: this.state.value.width,
      height: this.state.value.height,
    };
  }
  
  /**
   * 设置 Widget 尺寸
   * @param size Widget 尺寸
   */
  setSize(size: { width?: string | number; height?: string | number }): void {
    const oldSize = { ...this.state.value };
    
    if (size.width !== undefined) {
      this.state.value.width = size.width;
    }
    
    if (size.height !== undefined) {
      this.state.value.height = size.height;
    }
    
    if (this.events.onResize) {
      this.events.onResize(this.config.name, size);
    }
    
    this.log('Widget size updated:', this.config.name, oldSize, '->', size);
  }
  
  /**
   * 检查 Widget 是否折叠
   */
  isCollapsed(): boolean {
    return this.state.value.collapsed;
  }
  
  /**
   * 折叠/展开 Widget
   * @param collapsed 是否折叠
   */
  setCollapsed(collapsed: boolean): void {
    const oldCollapsed = this.state.value.collapsed;
    this.state.value.collapsed = collapsed;
    
    if (this.events.onCollapse) {
      this.events.onCollapse(this.config.name, collapsed);
    }
    
    this.log('Widget collapsed updated:', this.config.name, oldCollapsed, '->', collapsed);
  }
  
  /**
   * 切换 Widget 折叠状态
   */
  toggleCollapsed(): void {
    this.setCollapsed(!this.state.value.collapsed);
  }
  
  /**
   * 检查 Widget 是否可拖拽
   */
  isDraggable(): boolean {
    return this.config.draggable || false;
  }
  
  /**
   * 检查 Widget 是否可调整大小
   */
  isResizable(): boolean {
    return this.config.resizable || false;
  }
  
  /**
   * 检查 Widget 是否可关闭
   */
  isClosable(): boolean {
    return this.config.closable || false;
  }
  
  /**
   * 检查 Widget 是否可折叠
   */
  isCollapsible(): boolean {
    return this.config.collapsible || false;
  }
  
  /**
   * 获取 Widget 容器元素
   */
  getContainer(): HTMLElement | null {
    return this.container;
  }
  
  /**
   * 检查 Widget 是否已初始化
   */
  isInitialized(): boolean {
    return this.initialized;
  }
  
  /**
   * 检查 Widget 是否已销毁
   */
  isDestroyed(): boolean {
    return this.destroyed;
  }
  
  /**
   * 触发 Widget 点击事件
   */
  handleClick(): void {
    if (this.events.onClick) {
      this.events.onClick(this.config.name);
    }
    this.log('Widget clicked:', this.config.name);
  }
  
  /**
   * 触发 Widget 双击事件
   */
  handleDoubleClick(): void {
    if (this.events.onDoubleClick) {
      this.events.onDoubleClick(this.config.name);
    }
    this.log('Widget double clicked:', this.config.name);
  }
  
  /**
   * 触发 Widget 拖拽事件
   * @param position 位置
   */
  handleDrag(position: { x: number; y: number }): void {
    if (this.events.onDrag) {
      this.events.onDrag(this.config.name, position);
    }
    this.log('Widget dragged:', this.config.name, position);
  }
  
  /**
   * 触发 Widget 关闭事件
   */
  handleClose(): void {
    if (this.events.onClose) {
      this.events.onClose(this.config.name);
    }
    this.log('Widget closed:', this.config.name);
  }
  
  /**
   * 获取 Widget 样式
   */
  getStyles(): Record<string, any> {
    const styles: Record<string, any> = {
      ...this.config.style,
    };
    
    if (this.state.value.width !== undefined) {
      styles.width = typeof this.state.value.width === 'number' 
        ? `${this.state.value.width}px` 
        : this.state.value.width;
    }
    
    if (this.state.value.height !== undefined) {
      styles.height = typeof this.state.value.height === 'number' 
        ? `${this.state.value.height}px` 
        : this.state.value.height;
    }
    
    return styles;
  }
  
  /**
   * 获取 Widget 类名
   */
  getClassName(): string {
    const classNames: string[] = [
      'lc-widget',
      `lc-widget-${this.config.name}`,
    ];
    
    if (this.config.className) {
      classNames.push(this.config.className);
    }
    
    if (this.state.value.collapsed) {
      classNames.push('lc-widget-collapsed');
    }
    
    if (this.config.draggable) {
      classNames.push('lc-widget-draggable');
    }
    
    if (this.config.resizable) {
      classNames.push('lc-widget-resizable');
    }
    
    if (this.config.closable) {
      classNames.push('lc-widget-closable');
    }
    
    if (this.config.collapsible) {
      classNames.push('lc-widget-collapsible');
    }
    
    return classNames.join(' ');
  }
  
  /**
   * 重置 Widget 状态
   */
  reset(): void {
    this.state.value = {
      name: this.config.name,
      collapsed: this.config.collapsed || false,
      width: this.config.props?.width,
      height: this.config.props?.height,
      index: this.config.index,
    };
    
    this.log('Widget reset:', this.config.name);
  }
  
  /**
   * 记录日志
   */
  protected log(...args: any[]): void {
    console.log(`[Widget:${this.config.name}]`, ...args);
  }
  
  /**
   * 记录警告
   */
  protected warn(...args: any[]): void {
    console.warn(`[Widget:${this.config.name}]`, ...args);
  }
  
  /**
   * 记录错误
   */
  protected error(...args: any[]): void {
    console.error(`[Widget:${this.config.name}]`, ...args);
  }
}
