import { ref, computed, type Ref } from 'vue';
import type { AreaConfig, AreaState, AreaEvents } from '../types';

/**
 * Area 类 - 编辑器区域管理
 */
export class Area {
  /**
   * 区域配置
   */
  protected config: AreaConfig;
  
  /**
   * 区域状态
   */
  protected state: Ref<AreaState>;
  
  /**
   * 区域事件
   */
  protected events: AreaEvents;
  
  /**
   * 是否已初始化
   */
  protected initialized: boolean = false;
  
  /**
   * 是否已销毁
   */
  protected destroyed: boolean = false;
  
  /**
   * 区域容器元素
   */
  protected container: HTMLElement | null = null;
  
  /**
   * 构造函数
   * @param config 区域配置
   * @param events 区域事件
   */
  constructor(config: AreaConfig, events: AreaEvents = {}) {
    this.config = config;
    this.events = events;
    
    // 初始化状态
    this.state = ref<AreaState>({
      name: config.name,
      collapsed: config.collapsed || false,
      width: config.width,
      height: config.height,
    });
    
    this.log('Area created:', config.name);
  }
  
  /**
   * 初始化区域
   * @param container 区域容器
   */
  init(container: HTMLElement): void {
    if (this.initialized) {
      this.warn('Area already initialized:', this.config.name);
      return;
    }
    
    if (this.destroyed) {
      this.warn('Area already destroyed:', this.config.name);
      return;
    }
    
    this.container = container;
    this.initialized = true;
    
    this.log('Area initialized:', this.config.name);
  }
  
  /**
   * 销毁区域
   */
  destroy(): void {
    if (!this.initialized) {
      this.warn('Area not initialized:', this.config.name);
      return;
    }
    
    if (this.destroyed) {
      this.warn('Area already destroyed:', this.config.name);
      return;
    }
    
    this.container = null;
    this.destroyed = true;
    
    this.log('Area destroyed:', this.config.name);
  }
  
  /**
   * 获取区域配置
   */
  getConfig(): AreaConfig {
    return { ...this.config };
  }
  
  /**
   * 获取区域状态
   */
  getState(): AreaState {
    return { ...this.state.value };
  }
  
  /**
   * 设置区域配置
   * @param config 区域配置
   */
  setConfig(config: Partial<AreaConfig>): void {
    this.config = { ...this.config, ...config };
    this.log('Area config updated:', this.config.name, config);
  }
  
  /**
   * 设置区域状态
   * @param state 区域状态
   */
  setState(state: Partial<AreaState>): void {
    this.state.value = { ...this.state.value, ...state };
    this.log('Area state updated:', this.config.name, state);
  }
  
  /**
   * 获取区域名称
   */
  getName(): string {
    return this.config.name;
  }
  
  /**
   * 获取区域类型
   */
  getType(): string {
    return this.config.type;
  }
  
  /**
   * 获取区域标题
   */
  getTitle(): string | undefined {
    return this.config.title;
  }
  
  /**
   * 获取区域图标
   */
  getIcon(): string | undefined {
    return this.config.icon;
  }
  
  /**
   * 获取区域宽度
   */
  getWidth(): string | number | undefined {
    return this.state.value.width;
  }
  
  /**
   * 设置区域宽度
   * @param width 区域宽度
   */
  setWidth(width: string | number): void {
    const oldWidth = this.state.value.width;
    this.state.value.width = width;
    
    if (this.events.onResize) {
      this.events.onResize(this.config.name, { width });
    }
    
    this.log('Area width updated:', this.config.name, oldWidth, '->', width);
  }
  
  /**
   * 获取区域高度
   */
  getHeight(): string | number | undefined {
    return this.state.value.height;
  }
  
  /**
   * 设置区域高度
   * @param height 区域高度
   */
  setHeight(height: string | number): void {
    const oldHeight = this.state.value.height;
    this.state.value.height = height;
    
    if (this.events.onResize) {
      this.events.onResize(this.config.name, { height });
    }
    
    this.log('Area height updated:', this.config.name, oldHeight, '->', height);
  }
  
  /**
   * 获取区域尺寸
   */
  getSize(): { width?: string | number; height?: string | number } {
    return {
      width: this.state.value.width,
      height: this.state.value.height,
    };
  }
  
  /**
   * 设置区域尺寸
   * @param size 区域尺寸
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
    
    this.log('Area size updated:', this.config.name, oldSize, '->', size);
  }
  
  /**
   * 检查区域是否折叠
   */
  isCollapsed(): boolean {
    return this.state.value.collapsed;
  }
  
  /**
   * 折叠/展开区域
   * @param collapsed 是否折叠
   */
  setCollapsed(collapsed: boolean): void {
    const oldCollapsed = this.state.value.collapsed;
    this.state.value.collapsed = collapsed;
    
    if (this.events.onCollapse) {
      this.events.onCollapse(this.config.name, collapsed);
    }
    
    this.log('Area collapsed updated:', this.config.name, oldCollapsed, '->', collapsed);
  }
  
  /**
   * 切换区域折叠状态
   */
  toggleCollapsed(): void {
    this.setCollapsed(!this.state.value.collapsed);
  }
  
  /**
   * 检查区域是否可调整大小
   */
  isResizable(): boolean {
    return this.config.resizable || false;
  }
  
  /**
   * 检查区域是否可折叠
   */
  isCollapsible(): boolean {
    return this.config.collapsible || false;
  }
  
  /**
   * 检查区域是否可拖拽
   */
  isDraggable(): boolean {
    return this.config.draggable || false;
  }
  
  /**
   * 检查区域是否可关闭
   */
  isClosable(): boolean {
    return this.config.closable || false;
  }
  
  /**
   * 获取区域容器元素
   */
  getContainer(): HTMLElement | null {
    return this.container;
  }
  
  /**
   * 检查区域是否已初始化
   */
  isInitialized(): boolean {
    return this.initialized;
  }
  
  /**
   * 检查区域是否已销毁
   */
  isDestroyed(): boolean {
    return this.destroyed;
  }
  
  /**
   * 获取区域样式
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
   * 获取区域类名
   */
  getClassName(): string {
    const classNames: string[] = [
      'lc-area',
      `lc-area-${this.config.type}`,
      `lc-area-${this.config.name}`,
    ];
    
    if (this.config.className) {
      classNames.push(this.config.className);
    }
    
    if (this.state.value.collapsed) {
      classNames.push('lc-area-collapsed');
    }
    
    if (this.config.resizable) {
      classNames.push('lc-area-resizable');
    }
    
    if (this.config.collapsible) {
      classNames.push('lc-area-collapsible');
    }
    
    if (this.config.draggable) {
      classNames.push('lc-area-draggable');
    }
    
    return classNames.join(' ');
  }
  
  /**
   * 重置区域状态
   */
  reset(): void {
    this.state.value = {
      name: this.config.name,
      collapsed: this.config.collapsed || false,
      width: this.config.width,
      height: this.config.height,
    };
    
    this.log('Area reset:', this.config.name);
  }
  
  /**
   * 记录日志
   */
  protected log(...args: any[]): void {
    console.log(`[Area:${this.config.name}]`, ...args);
  }
  
  /**
   * 记录警告
   */
  protected warn(...args: any[]): void {
    console.warn(`[Area:${this.config.name}]`, ...args);
  }
  
  /**
   * 记录错误
   */
  protected error(...args: any[]): void {
    console.error(`[Area:${this.config.name}]`, ...args);
  }
}
