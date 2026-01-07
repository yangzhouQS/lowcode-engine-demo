import { ref, type Ref } from 'vue';
import type { PanelConfig, PanelState, PanelEvents } from '../types';

/**
 * Panel 类 - 编辑器面板管理
 */
export class Panel {
  /**
   * 面板配置
   */
  protected config: PanelConfig;
  
  /**
   * 面板状态
   */
  protected state: Ref<PanelState>;
  
  /**
   * 面板事件
   */
  protected events: PanelEvents;
  
  /**
   * 是否已初始化
   */
  protected initialized: boolean = false;
  
  /**
   * 是否已销毁
   */
  protected destroyed: boolean = false;
  
  /**
   * 面板容器元素
   */
  protected container: HTMLElement | null = null;
  
  /**
   * 构造函数
   * @param config 面板配置
   * @param events 面板事件
   */
  constructor(config: PanelConfig, events: PanelEvents = {}) {
    this.config = config;
    this.events = events;
    
    // 初始化状态
    this.state = ref<PanelState>({
      name: config.name,
      collapsed: config.collapsed || false,
      width: config.props?.width,
      height: config.props?.height,
      index: config.index,
    });
    
    this.log('Panel created:', config.name);
  }
  
  /**
   * 初始化面板
   * @param container 面板容器
   */
  init(container: HTMLElement): void {
    if (this.initialized) {
      this.warn('Panel already initialized:', this.config.name);
      return;
    }
    
    if (this.destroyed) {
      this.warn('Panel already destroyed:', this.config.name);
      return;
    }
    
    this.container = container;
    this.initialized = true;
    
    this.log('Panel initialized:', this.config.name);
  }
  
  /**
   * 销毁面板
   */
  destroy(): void {
    if (!this.initialized) {
      this.warn('Panel not initialized:', this.config.name);
      return;
    }
    
    if (this.destroyed) {
      this.warn('Panel already destroyed:', this.config.name);
      return;
    }
    
    this.container = null;
    this.destroyed = true;
    
    this.log('Panel destroyed:', this.config.name);
  }
  
  /**
   * 获取面板配置
   */
  getConfig(): PanelConfig {
    return { ...this.config };
  }
  
  /**
   * 获取面板状态
   */
  getState(): PanelState {
    return { ...this.state.value };
  }
  
  /**
   * 设置面板配置
   * @param config 面板配置
   */
  setConfig(config: Partial<PanelConfig>): void {
    this.config = { ...this.config, ...config };
    this.log('Panel config updated:', this.config.name, config);
  }
  
  /**
   * 设置面板状态
   * @param state 面板状态
   */
  setState(state: Partial<PanelState>): void {
    this.state.value = { ...this.state.value, ...state };
    this.log('Panel state updated:', this.config.name, state);
  }
  
  /**
   * 获取面板名称
   */
  getName(): string {
    return this.config.name;
  }
  
  /**
   * 获取面板标题
   */
  getTitle(): string {
    return this.config.title;
  }
  
  /**
   * 获取面板图标
   */
  getIcon(): string | undefined {
    return this.config.icon;
  }
  
  /**
   * 获取面板组件
   */
  getComponent(): any {
    return this.config.component;
  }
  
  /**
   * 获取面板属性
   */
  getProps(): Record<string, any> {
    return { ...this.config.props };
  }
  
  /**
   * 设置面板属性
   * @param props 面板属性
   */
  setProps(props: Partial<Record<string, any>>): void {
    this.config.props = { ...this.config.props, ...props };
    this.log('Panel props updated:', this.config.name, props);
  }
  
  /**
   * 获取面板区域
   */
  getArea(): string | undefined {
    return this.config.area;
  }
  
  /**
   * 设置面板区域
   * @param area 面板区域
   */
  setArea(area: string): void {
    const oldArea = this.config.area;
    this.config.area = area;
    this.log('Panel area updated:', this.config.name, oldArea, '->', area);
  }
  
  /**
   * 获取面板索引
   */
  getIndex(): number | undefined {
    return this.state.value.index;
  }
  
  /**
   * 设置面板索引
   * @param index 面板索引
   */
  setIndex(index: number): void {
    const oldIndex = this.state.value.index;
    this.state.value.index = index;
    this.log('Panel index updated:', this.config.name, oldIndex, '->', index);
  }
  
  /**
   * 获取面板宽度
   */
  getWidth(): string | number | undefined {
    return this.state.value.width;
  }
  
  /**
   * 设置面板宽度
   * @param width 面板宽度
   */
  setWidth(width: string | number): void {
    const oldWidth = this.state.value.width;
    this.state.value.width = width;
    
    if (this.events.onResize) {
      this.events.onResize(this.config.name, { width });
    }
    
    this.log('Panel width updated:', this.config.name, oldWidth, '->', width);
  }
  
  /**
   * 获取面板高度
   */
  getHeight(): string | number | undefined {
    return this.state.value.height;
  }
  
  /**
   * 设置面板高度
   * @param height 面板高度
   */
  setHeight(height: string | number): void {
    const oldHeight = this.state.value.height;
    this.state.value.height = height;
    
    if (this.events.onResize) {
      this.events.onResize(this.config.name, { height });
    }
    
    this.log('Panel height updated:', this.config.name, oldHeight, '->', height);
  }
  
  /**
   * 获取面板尺寸
   */
  getSize(): { width?: string | number; height?: string | number } {
    return {
      width: this.state.value.width,
      height: this.state.value.height,
    };
  }
  
  /**
   * 设置面板尺寸
   * @param size 面板尺寸
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
    
    this.log('Panel size updated:', this.config.name, oldSize, '->', size);
  }
  
  /**
   * 检查面板是否折叠
   */
  isCollapsed(): boolean {
    return this.state.value.collapsed;
  }
  
  /**
   * 折叠/展开面板
   * @param collapsed 是否折叠
   */
  setCollapsed(collapsed: boolean): void {
    const oldCollapsed = this.state.value.collapsed;
    this.state.value.collapsed = collapsed;
    
    if (this.events.onCollapse) {
      this.events.onCollapse(this.config.name, collapsed);
    }
    
    this.log('Panel collapsed updated:', this.config.name, oldCollapsed, '->', collapsed);
  }
  
  /**
   * 切换面板折叠状态
   */
  toggleCollapsed(): void {
    this.setCollapsed(!this.state.value.collapsed);
  }
  
  /**
   * 检查面板是否可拖拽
   */
  isDraggable(): boolean {
    return this.config.draggable || false;
  }
  
  /**
   * 检查面板是否可调整大小
   */
  isResizable(): boolean {
    return this.config.resizable || false;
  }
  
  /**
   * 检查面板是否可关闭
   */
  isClosable(): boolean {
    return this.config.closable || false;
  }
  
  /**
   * 检查面板是否可折叠
   */
  isCollapsible(): boolean {
    return this.config.collapsible || false;
  }
  
  /**
   * 获取面板容器元素
   */
  getContainer(): HTMLElement | null {
    return this.container;
  }
  
  /**
   * 检查面板是否已初始化
   */
  isInitialized(): boolean {
    return this.initialized;
  }
  
  /**
   * 检查面板是否已销毁
   */
  isDestroyed(): boolean {
    return this.destroyed;
  }
  
  /**
   * 触发面板点击事件
   */
  handleClick(): void {
    if (this.events.onClick) {
      this.events.onClick(this.config.name);
    }
    this.log('Panel clicked:', this.config.name);
  }
  
  /**
   * 触发面板双击事件
   */
  handleDoubleClick(): void {
    if (this.events.onDoubleClick) {
      this.events.onDoubleClick(this.config.name);
    }
    this.log('Panel double clicked:', this.config.name);
  }
  
  /**
   * 触发面板拖拽事件
   * @param position 位置
   */
  handleDrag(position: { x: number; y: number }): void {
    if (this.events.onDrag) {
      this.events.onDrag(this.config.name, position);
    }
    this.log('Panel dragged:', this.config.name, position);
  }
  
  /**
   * 触发面板关闭事件
   */
  handleClose(): void {
    if (this.events.onClose) {
      this.events.onClose(this.config.name);
    }
    this.log('Panel closed:', this.config.name);
  }
  
  /**
   * 获取面板样式
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
   * 获取面板类名
   */
  getClassName(): string {
    const classNames: string[] = [
      'lc-panel',
      `lc-panel-${this.config.name}`,
    ];
    
    if (this.config.className) {
      classNames.push(this.config.className);
    }
    
    if (this.state.value.collapsed) {
      classNames.push('lc-panel-collapsed');
    }
    
    if (this.config.draggable) {
      classNames.push('lc-panel-draggable');
    }
    
    if (this.config.resizable) {
      classNames.push('lc-panel-resizable');
    }
    
    if (this.config.closable) {
      classNames.push('lc-panel-closable');
    }
    
    if (this.config.collapsible) {
      classNames.push('lc-panel-collapsible');
    }
    
    return classNames.join(' ');
  }
  
  /**
   * 重置面板状态
   */
  reset(): void {
    this.state.value = {
      name: this.config.name,
      collapsed: this.config.collapsed || false,
      width: this.config.props?.width,
      height: this.config.props?.height,
      index: this.config.index,
    };
    
    this.log('Panel reset:', this.config.name);
  }
  
  /**
   * 记录日志
   */
  protected log(...args: any[]): void {
    console.log(`[Panel:${this.config.name}]`, ...args);
  }
  
  /**
   * 记录警告
   */
  protected warn(...args: any[]): void {
    console.warn(`[Panel:${this.config.name}]`, ...args);
  }
  
  /**
   * 记录错误
   */
  protected error(...args: any[]): void {
    console.error(`[Panel:${this.config.name}]`, ...args);
  }
}
