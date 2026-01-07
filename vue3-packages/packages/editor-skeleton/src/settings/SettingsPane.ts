import { ref, type Ref } from 'vue';
import type { SettingsPaneConfig, SettingsPaneState, SettingsPaneEvents } from '../types';

/**
 * SettingsPane 类 - 编辑器设置面板管理
 */
export class SettingsPane {
  /**
   * 设置面板配置
   */
  protected config: SettingsPaneConfig;
  
  /**
   * 设置面板状态
   */
  protected state: Ref<SettingsPaneState>;
  
  /**
   * 设置面板事件
   */
  protected events: SettingsPaneEvents;
  
  /**
   * 是否已初始化
   */
  protected initialized: boolean = false;
  
  /**
   * 是否已销毁
   */
  protected destroyed: boolean = false;
  
  /**
   * 设置面板容器元素
   */
  protected container: HTMLElement | null = null;
  
  /**
   * 构造函数
   * @param config 设置面板配置
   * @param events 设置面板事件
   */
  constructor(config: SettingsPaneConfig, events: SettingsPaneEvents = {}) {
    this.config = config;
    this.events = events;
    
    // 初始化状态
    this.state = ref<SettingsPaneState>({
      name: config.name,
      collapsed: config.collapsed || false,
      width: config.props?.width,
      height: config.props?.height,
      index: config.index,
    });
    
    this.log('SettingsPane created:', config.name);
  }
  
  /**
   * 初始化设置面板
   * @param container 设置面板容器
   */
  init(container: HTMLElement): void {
    if (this.initialized) {
      this.warn('SettingsPane already initialized:', this.config.name);
      return;
    }
    
    if (this.destroyed) {
      this.warn('SettingsPane already destroyed:', this.config.name);
      return;
    }
    
    this.container = container;
    this.initialized = true;
    
    this.log('SettingsPane initialized:', this.config.name);
  }
  
  /**
   * 销毁设置面板
   */
  destroy(): void {
    if (!this.initialized) {
      this.warn('SettingsPane not initialized:', this.config.name);
      return;
    }
    
    if (this.destroyed) {
      this.warn('SettingsPane already destroyed:', this.config.name);
      return;
    }
    
    this.container = null;
    this.destroyed = true;
    
    this.log('SettingsPane destroyed:', this.config.name);
  }
  
  /**
   * 获取设置面板配置
   */
  getConfig(): SettingsPaneConfig {
    return { ...this.config };
  }
  
  /**
   * 获取设置面板状态
   */
  getState(): SettingsPaneState {
    return { ...this.state.value };
  }
  
  /**
   * 设置设置面板配置
   * @param config 设置面板配置
   */
  setConfig(config: Partial<SettingsPaneConfig>): void {
    this.config = { ...this.config, ...config };
    this.log('SettingsPane config updated:', this.config.name, config);
  }
  
  /**
   * 设置设置面板状态
   * @param state 设置面板状态
   */
  setState(state: Partial<SettingsPaneState>): void {
    this.state.value = { ...this.state.value, ...state };
    this.log('SettingsPane state updated:', this.config.name, state);
  }
  
  /**
   * 获取设置面板名称
   */
  getName(): string {
    return this.config.name;
  }
  
  /**
   * 获取设置面板标题
   */
  getTitle(): string {
    return this.config.title;
  }
  
  /**
   * 获取设置面板图标
   */
  getIcon(): string | undefined {
    return this.config.icon;
  }
  
  /**
   * 获取设置面板组件
   */
  getComponent(): any {
    return this.config.component;
  }
  
  /**
   * 获取设置面板属性
   */
  getProps(): Record<string, any> {
    return { ...this.config.props };
  }
  
  /**
   * 设置设置面板属性
   * @param props 设置面板属性
   */
  setProps(props: Partial<Record<string, any>>): void {
    this.config.props = { ...this.config.props, ...props };
    this.log('SettingsPane props updated:', this.config.name, props);
  }
  
  /**
   * 获取设置面板区域
   */
  getArea(): string | undefined {
    return this.config.area;
  }
  
  /**
   * 设置设置面板区域
   * @param area 设置面板区域
   */
  setArea(area: string): void {
    const oldArea = this.config.area;
    this.config.area = area;
    this.log('SettingsPane area updated:', this.config.name, oldArea, '->', area);
  }
  
  /**
   * 获取设置面板索引
   */
  getIndex(): number | undefined {
    return this.state.value.index;
  }
  
  /**
   * 设置设置面板索引
   * @param index 设置面板索引
   */
  setIndex(index: number): void {
    const oldIndex = this.state.value.index;
    this.state.value.index = index;
    this.log('SettingsPane index updated:', this.config.name, oldIndex, '->', index);
  }
  
  /**
   * 获取设置面板宽度
   */
  getWidth(): string | number | undefined {
    return this.state.value.width;
  }
  
  /**
   * 设置设置面板宽度
   * @param width 设置面板宽度
   */
  setWidth(width: string | number): void {
    const oldWidth = this.state.value.width;
    this.state.value.width = width;
    
    if (this.events.onResize) {
      this.events.onResize(this.config.name, { width });
    }
    
    this.log('SettingsPane width updated:', this.config.name, oldWidth, '->', width);
  }
  
  /**
   * 获取设置面板高度
   */
  getHeight(): string | number | undefined {
    return this.state.value.height;
  }
  
  /**
   * 设置设置面板高度
   * @param height 设置面板高度
   */
  setHeight(height: string | number): void {
    const oldHeight = this.state.value.height;
    this.state.value.height = height;
    
    if (this.events.onResize) {
      this.events.onResize(this.config.name, { height });
    }
    
    this.log('SettingsPane height updated:', this.config.name, oldHeight, '->', height);
  }
  
  /**
   * 获取设置面板尺寸
   */
  getSize(): { width?: string | number; height?: string | number } {
    return {
      width: this.state.value.width,
      height: this.state.value.height,
    };
  }
  
  /**
   * 设置设置面板尺寸
   * @param size 设置面板尺寸
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
    
    this.log('SettingsPane size updated:', this.config.name, oldSize, '->', size);
  }
  
  /**
   * 检查设置面板是否折叠
   */
  isCollapsed(): boolean {
    return this.state.value.collapsed;
  }
  
  /**
   * 折叠/展开设置面板
   * @param collapsed 是否折叠
   */
  setCollapsed(collapsed: boolean): void {
    const oldCollapsed = this.state.value.collapsed;
    this.state.value.collapsed = collapsed;
    
    if (this.events.onCollapse) {
      this.events.onCollapse(this.config.name, collapsed);
    }
    
    this.log('SettingsPane collapsed updated:', this.config.name, oldCollapsed, '->', collapsed);
  }
  
  /**
   * 切换设置面板折叠状态
   */
  toggleCollapsed(): void {
    this.setCollapsed(!this.state.value.collapsed);
  }
  
  /**
   * 检查设置面板是否可拖拽
   */
  isDraggable(): boolean {
    return this.config.draggable || false;
  }
  
  /**
   * 检查设置面板是否可调整大小
   */
  isResizable(): boolean {
    return this.config.resizable || false;
  }
  
  /**
   * 检查设置面板是否可关闭
   */
  isClosable(): boolean {
    return this.config.closable || false;
  }
  
  /**
   * 检查设置面板是否可折叠
   */
  isCollapsible(): boolean {
    return this.config.collapsible || false;
  }
  
  /**
   * 获取设置面板容器元素
   */
  getContainer(): HTMLElement | null {
    return this.container;
  }
  
  /**
   * 检查设置面板是否已初始化
   */
  isInitialized(): boolean {
    return this.initialized;
  }
  
  /**
   * 检查设置面板是否已销毁
   */
  isDestroyed(): boolean {
    return this.destroyed;
  }
  
  /**
   * 触发设置面板点击事件
   */
  handleClick(): void {
    if (this.events.onClick) {
      this.events.onClick(this.config.name);
    }
    this.log('SettingsPane clicked:', this.config.name);
  }
  
  /**
   * 触发设置面板双击事件
   */
  handleDoubleClick(): void {
    if (this.events.onDoubleClick) {
      this.events.onDoubleClick(this.config.name);
    }
    this.log('SettingsPane double clicked:', this.config.name);
  }
  
  /**
   * 触发设置面板拖拽事件
   * @param position 位置
   */
  handleDrag(position: { x: number; y: number }): void {
    if (this.events.onDrag) {
      this.events.onDrag(this.config.name, position);
    }
    this.log('SettingsPane dragged:', this.config.name, position);
  }
  
  /**
   * 触发设置面板关闭事件
   */
  handleClose(): void {
    if (this.events.onClose) {
      this.events.onClose(this.config.name);
    }
    this.log('SettingsPane closed:', this.config.name);
  }
  
  /**
   * 获取设置面板样式
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
   * 获取设置面板类名
   */
  getClassName(): string {
    const classNames: string[] = [
      'lc-settings-pane',
      `lc-settings-pane-${this.config.name}`,
    ];
    
    if (this.config.className) {
      classNames.push(this.config.className);
    }
    
    if (this.state.value.collapsed) {
      classNames.push('lc-settings-pane-collapsed');
    }
    
    if (this.config.draggable) {
      classNames.push('lc-settings-pane-draggable');
    }
    
    if (this.config.resizable) {
      classNames.push('lc-settings-pane-resizable');
    }
    
    if (this.config.closable) {
      classNames.push('lc-settings-pane-closable');
    }
    
    if (this.config.collapsible) {
      classNames.push('lc-settings-pane-collapsible');
    }
    
    return classNames.join(' ');
  }
  
  /**
   * 重置设置面板状态
   */
  reset(): void {
    this.state.value = {
      name: this.config.name,
      collapsed: this.config.collapsed || false,
      width: this.config.props?.width,
      height: this.config.props?.height,
      index: this.config.index,
    };
    
    this.log('SettingsPane reset:', this.config.name);
  }
  
  /**
   * 记录日志
   */
  protected log(...args: any[]): void {
    console.log(`[SettingsPane:${this.config.name}]`, ...args);
  }
  
  /**
   * 记录警告
   */
  protected warn(...args: any[]): void {
    console.warn(`[SettingsPane:${this.config.name}]`, ...args);
  }
  
  /**
   * 记录错误
   */
  protected error(...args: any[]): void {
    console.error(`[SettingsPane:${this.config.name}]`, ...args);
  }
}
